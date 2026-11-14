import Elysia from "elysia";
import { WordModel } from "./model";
import { prisma } from "@repo/db";


export const word = new Elysia({prefix : "/word"})
    .get("/",{
        query : WordModel.getWordMeaningParams 
    }, async({ query }) =>{
        const {length, firstChar } = query

        console.log(firstChar[1])
        
        const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

        const results = await Promise.all(
        letters.map(char =>
            prisma.word.findMany({
            where: { length, firstChar: char },
            orderBy: { text: 'asc' },
            take: 3,
            select: { text: true, length: true },
            })
        )
        )

        const res = results.flat() // max 78 words (26 × 3)   
        return {
            word : res
        }
    })