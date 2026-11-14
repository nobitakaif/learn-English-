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

            console.log(payload)

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

                const newUser = await prisma.user.create({
                    data : {
                        avatar : payload?.picture!,
                        email : payload?.email!,
                        isEmailVerified : payload?.email_verified!,
                        userName : payload?.name!,
                        provider : "GOOGLE"
                    }
                })
                return {
                    isLoggedIn : false as const,
                    success : false as const, 
                    msg : "your new account is created",
                    newUserId : newUser.id
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

    static async userInfoStore(body : UserModel.UserInfoSchema) : Promise<UserModel.UserInfoSuccess | UserModel.UserInfoFailed> {
        try{
            
            const res = await prisma.user.update({
                where : {
                    id : body.id
                },data :{
                    userInfo : {
                        create : {
                            currentLevel : body.level,
                            dob : body.dob,
                            initialLevel : body.level,
                            nickName : body.username,
                            occupation : body.occupation,
                            phoneNumber : body.phoneNumber
                        }
                    }
                }
            })
            
            return {
                id : res.id,
                msg : "your info have been saved :)"
            }

        }catch(e){

            console.log("error -> ", e)
            
            return {
                msg : "something went wrong pls try again!",
                error : e
            }
        }
    }
}