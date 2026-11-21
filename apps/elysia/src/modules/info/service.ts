import { prisma } from "@repo/db";
import { UserInfoModel } from "./model";



export abstract class UserInfoService {
    static async storeUserInfo(info: UserInfoModel.UserInfoSchema, userId : string) : Promise< UserInfoModel.UserInfoSuccess | UserInfoModel.UserInfoFailed> {
        try{
            const res = await prisma.userInfo.upsert({
                where: {
                    userId: userId
                },     
                update: {
                    nickName: info.name,
                    dob: info.dob,
                    phoneNumber: info.phoneNumber.toString(),
                    occupation: info.occupation,
                    currentLevel: info.level,
                    initialLevel: info.level,
                },
                create: {
                    userId: userId,
                    nickName: info.name,
                    dob: info.dob,
                    phoneNumber: info.phoneNumber.toString(),
                    occupation: info.occupation,
                    currentLevel: info.level,
                    initialLevel: info.level,
                },
            });

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