import { Elysia } from "elysia"
import { prisma } from "@repo/db"


const userInfo = new Elysia({prefix : "/user"})
    .post("/info", async ()=>{

    })