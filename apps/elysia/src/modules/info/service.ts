import { prisma } from "@repo/db";
import { UserInfoModel } from "./model";



export abstract class UserInfoService {
    static async storeUserInfo(info: UserInfoModel.UserInfoSchema, userId : string) : Promise< UserInfoModel.UserInfoSuccess | UserInfoModel.UserInfoFailed> {
        // const res 
        try{
            const res = await prisma.userInfo.create({
                data : {
                    userId : userId,
                    currentLevel : info.level,
                    initialLevel : info.level,
                    dob : info.dob,
                    nickName : info.name,
                    occupation : info.occupation,
                    phoneNumber : info.phoneNumber
                }
            })

            if(!res.id){
                return {
                    error : "user info not saved",
                    msg : "something went wrong!"
                }
            }
            
            return {
            id : res.id,
            msg : "your info is saved"
            }
        }catch(e){
            return {
                error : e,
                msg : "something went wrong!"
            }
        }
        
    }
}