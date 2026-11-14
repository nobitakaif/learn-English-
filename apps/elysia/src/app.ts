import { Elysia } from "elysia";
import { user } from "./modules/user";
import cors from "@elysia/cors";
import { word } from "./modules/word";

export const app = new Elysia({prefix : "/api/v1"})
  .use(cors({
    origin : ["http://localhost:3000"], 
  }))
  .use(user)
  .use(word)


export type App = typeof app