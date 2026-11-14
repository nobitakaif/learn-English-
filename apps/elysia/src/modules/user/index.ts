
import { Elysia, redirect, status, t } from "elysia";
import { OAuth2Client } from "google-auth-library";
import { jwt } from "@elysia/jwt"
import { UserService } from "./service";
import { UserModel } from "./models";

const clientId = process.env.GOOGLE_CLIENT_ID!;

const GoogleOAuthClient = new OAuth2Client(clientId);

export const user = new Elysia({prefix : "/auth"})
  .get("/health", {
      body : t.Object({
        name : t.String()
      })
  },({body}) =>{
    return {
      msg : body.name
    }
  })
  .use(jwt({
    name : "jwt", 
    secret : process.env.JWT_SECRET!
  }))
  .post("/google/callback", { 
    body : UserModel.userLoggedInSchema,
    response : {
      200 : UserModel.userLoggedInSuccess,
      400 : UserModel.userLoggedInFailed
    }
  }, async({body, status, jwt, cookie : { auth }})=>{
  
    const res = await UserService.isLoggedIn(body)

    
    
    if(res.isLoggedIn === true) {
      console.log("you're signin ")

      console.log("inside 200 status -> ",JSON.stringify(res))
      
      
      
    const token = await jwt.sign({userId : res.userId})
    auth.set({
        value : token,
        httpOnly : true,
        maxAge : 7 * 86400,
        path : "/"
      })  

      return status(200, {
        isLoggedIn : res.isLoggedIn,
        success : res.success, 
        userId : res.userId
      })
    }

    
    const token = await jwt.sign({userId : res.newUserId})
    auth.set({
        value : token,
        httpOnly : true,
        maxAge : 7 * 86400,
        path : "/"
      })
    
    return status(400, {
      isLoggedIn : res.isLoggedIn,
      success : res.success, 
      msg : res.msg,
      newUserId : res.newUserId
    })
    
  })
  .derive(async ({cookie : {auth}, jwt})=>{
        if(!auth.value){
            console.log("this user is not logged in no auth value", auth.value)
            return status(400, {
                msg : "your not logged in :("
            })
        }
        const token = auth.value as string 

        console.log("toknnn- > ", token)
        try{
            const decodedToken = await jwt.verify(token)
            if(!decodedToken){
                return status(401, {
                    msg : "invalid token!"
                })
            }
            console.log("userId -> ", decodedToken.userId)
            return {
                userId : decodedToken.userId
            }
        }
        catch(e){
            return status(401, {
                msg : "token incorrect!"
            })
        }
    })
  .post("/info", {
    body : UserModel.userInfoSchema
  }, async ({ body, userId , jwt , cookie : { auth } })=>{
    body.id = userId
    
    const res = await UserService.
    userInfoStore(body)
    if("id" in res){
      
      const token = await jwt.sign({userId : res.id})

      auth.set({
        value : token,
        httpOnly : true,
        maxAge : 7 * 86400,
        path : "/"
      })
      return status(200,{
        id : res.id,
        msg : res.msg
      })
    }
    
    return status(400, {
      error : res.error,
      msg : res.msg
    })
    
  })



