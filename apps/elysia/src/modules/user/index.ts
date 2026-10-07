import Elysia from "elysia";
import { OAuth2Client } from "google-auth-library";


const googleClientId = process.env.GOOGLE_CLIENT_ID
const GoogleOAuthClient = new OAuth2Client(googleClientId)

console.log(googleClientId)

export const user = new Elysia({prefix : "/user"})
    .get("/",async() =>{
        return {
            msg : "alright"
        }
    })