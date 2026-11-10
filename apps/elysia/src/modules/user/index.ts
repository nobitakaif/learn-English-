
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
      200 : t.Object({
        msg : t.String()
      }),
      400 : t.Object({
        msg : t.String()
      })
    }
  }, async({body, status})=>{
  
    const res = await UserService.isLoggedIn(body)

    if('isLoggedIn' in res && res.isLoggedIn === false){
      console.log("you're not sigin pls sign in first ")

      return status(200, {
        msg : "you're redirecting to sign up page"
      })
      
    }
    console.log("you're signin ")
    redirect("/info")
    
  
    return status(200, {
      msg : "alright"
    })
    
    
  })



