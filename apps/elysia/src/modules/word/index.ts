import Elysia, { status } from "elysia";
import { WordModel } from "./model";
import { prisma } from "@repo/db";
import jwt from "@elysia/jwt";
import { currentLevel, daysUnitNextLevel, pickWordsForLetter, recordSent } from "./constFunction";


export const word = new Elysia({ prefix: "/word" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  .derive(async ({ cookie: { auth }, jwt }) => {
    if (!auth.value) {
      console.log("this user is not logged in, no auth value", auth.value);
      return status(400, {
        msg: "your not logged in :(",
      });
    }

    const token = auth.value as string;
    console.log("token - > ", token);

    try {
      const decodedToken = await jwt.verify(token);

      if (!decodedToken) {
        return status(401, {
          msg: "invalid token!",
        });
      }

      console.log("userId -> ", decodedToken.userId);
      return {
        userId: decodedToken.userId as string,
      };
    } catch (e) {
      return status(401, {
        msg: "token incorrect!",
      });
    }
  })
  .get(
    "/",
    {
      query: WordModel.getWordMeaningParams,
    },
    async ({ query, userId }) => {
      const { length, firstChar } = query;
      const len = length ? Number(length) : undefined;

      if (!userId) {
        return status(401, { msg: "unauthorized" });
      }

      const user = await prisma.user.findFirstOrThrow({
        where : {
            id : userId
        },
        select : {
            createdAt : true
        }
      })

      const dateLength = currentLevel(user?.createdAt)

      const letters = firstChar
        ? [firstChar.toLowerCase()]
        : "abcdefghijklmnopqrstuvwxyz".split("");

      const perLetter = await Promise.all(
        letters.map((char) => pickWordsForLetter(userId, char, len, 7))
      );

      const words = perLetter.flat();

      if (!words.length) {
        return {
          word: [],
          msg: "No new words available right now. Come back tomorrow!",
        };
      }

      await recordSent(
        userId,
        words.map((w) => w.id)
      );

      return {
        word: words.map(({ text, length }) => ({ text, length })),
        length : dateLength,
        dayUntilNext : daysUnitNextLevel(user.createdAt)
      };
    }
  );