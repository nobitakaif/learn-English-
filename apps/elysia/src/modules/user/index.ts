
import { Elysia, redirect, t } from "elysia";
import { OAuth2Client } from "google-auth-library";

const clientId = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const callbackUrl = process.env.GOOGLE_CALLBACK_URL!;
const frontendUrl = process.env.FRONTEND_URL!;

const GoogleOAuthClient = new OAuth2Client(clientId);

export const user = new Elysia({prefix : "/auth"})
  .get("/health", ({}) =>{
    return {
      msg : "alright"
    }
  })
  .post("/google/callback", async({body})=>{
    console.log("here is body ->",body)

    console.log("client id -> ", process.env.GOOGLE_CLIENT_ID)

    const ticket = await GoogleOAuthClient.verifyIdToken({
      idToken : body.idToken,
      audience : clientId
    })
    console.log("ticket -> ", ticket)
    const payload = ticket.getPayload()

    console.log("payload -> ", payload)

    return {
      msg : "your are logged in",
      user : {
        name : payload?.name ,
        avatar : payload?.picture,
        email : payload?.email
      } 
    }
    
  }, {
    body : t.Any()
  })