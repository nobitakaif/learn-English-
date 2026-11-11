import { OAuth2Client } from "google-auth-library";
import { UserModel } from "./models";
import { Prisma, prisma } from "@repo/db";


const clientId = process.env.GOOGLE_CLIENT_ID!;
const GoogleOAuthClient = new OAuth2Client(clientId);

export abstract class UserService{
    static async  isLoggedIn( body : UserModel.UserLoggedInSchema) :Promise<UserModel.UserLoggedInSuccess | UserModel.UserLoggedInFailed> {
        try{
            const ticket = await GoogleOAuthClient.verifyIdToken({
                idToken : body.idToken,
                audience : clientId
            })

            const payload = ticket.getPayload()

            console.log(payload?.email)

            const user = await prisma.user.findFirst({
                where : {
                    email : payload?.email
                }, 
                select : {
                    id : true
                }
            })

            console.log("userInfo -> ", user)
            
            if(!user){
                return {
                    isLoggedIn : false as const,
                    success : false as const, 
                    msg : "you're data not found, pls create new account"
                }
            }
            
            return {
                userId : user.id,
                isLoggedIn : true as const,
                success : true as const,
            }

        }
        catch(e){
            console.log("Google authentication error : ", e)
            throw e
        }
    }
}