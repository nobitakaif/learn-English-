import { Elysia } from "elysia";
import { user } from "./modules/user";
import cors from "@elysia/cors";

export const app = new Elysia({prefix : "/api/v1"})
  .use(cors({
    origin : ["http://localhost:3000"], 
  }))
  .use(user)


export type App = typeof app