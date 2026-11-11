
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
  }, async({body, status})=>{
  
    const res = await UserService.isLoggedIn(body)

    if(res.isLoggedIn === true) {
      console.log("you're signin ")

      console.log("inside 200 status -> ",JSON.stringify(res))
      
      redirect("/info")
      return status(200, {
        isLoggedIn : res.isLoggedIn,
        success : res.success, 
        userId : res.userId
      })
    }
    
    console.log("you're not signin")
    console.log("outside 400 status -> ",JSON.stringify(res))

    
  
    return status(400, {
      isLoggedIn : res.isLoggedIn,
      success : res.success, 
      msg : res.msg
    })
    
  })



