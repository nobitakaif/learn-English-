import { Elysia } from "elysia";
import { user } from "./modules/user";
import cors from "@elysia/cors";
import { word } from "./modules/word";
import { userInfo } from "./modules/info";

export const app = new Elysia({prefix : "/api/v1"})
  .use(cors({
    origin : ["http://localhost:3000"], 
  }))
  .use(user)
  .use(word)
  .use(userInfo)


export type App = typeof app