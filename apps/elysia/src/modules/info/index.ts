import { Elysia, status, t } from "elysia"
import { prisma } from "@repo/db"
import {  UserInfoModel } from "./model"
import { UserInfoService } from "./service"
import jwt from "@elysia/jwt"

export const userInfo = new Elysia({prefix : "/user"})
    .use(jwt({
        name : "jwt",
        secret : process.env.JWT_SECRET!
    }))

    .derive(async ({cookie: {auth}, jwt, headers}) =>{

        if(!auth.value){
            console.log("cookie : -> ", auth.value)
            return status(401,{
                msg : "token is not present!"
            })
        }
        
        const token = auth.value
        try{
            const decodedToken = await jwt.verify(token as string)

            if(!decodedToken){
                return status(401,{
                    msg : "invalieToken token!"
                })
            }
            console.log("userid -> ", decodedToken.userId)
            return {
                id : decodedToken.userId
            }
        }catch(e){
            return {
                msg : "something went wrong"
            }
        }
        
        
    })
    .post("/info", async ({body, id})=>{
        
        const res = await UserInfoService.storeUserInfo(body, id)

        if("id" in res){
            return status(200, {
                id : res.id,
                msg : res.msg
            })
        }
        return status(400, {
            error : res.error,
            msg : res.msg
        })
        
        
    }, {
        body : UserInfoModel.userInfoSchema,
        response : {
            200 : UserInfoModel.userInfoSuccess,
            400 : UserInfoModel.userInfoFailed
        },
        query : t.Object({
            id : t.String({format : "uuid"})
        }) // userId 
    })