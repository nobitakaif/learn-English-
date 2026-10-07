import { t } from "elysia";


export namespace UserModel{
    export const userSchema = t.Object({
        userName : t.String(),
        provider : t.UnionEnum(["Google", "Email", "Credential"]),
        avatarUrl : t.String()
    }) 
    export type UserSchema = typeof userSchema.static    
}