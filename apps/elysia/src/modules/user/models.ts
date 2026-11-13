import { t, type UnwrapSchema } from "elysia";


export namespace UserModel{
    export const userSchema = t.Object({
        userName : t.String(),
        provider : t.UnionEnum(["Google", "Email", "Credential"]),
        avatarUrl : t.String()
    }) 
    export type UserSchema = UnwrapSchema<typeof userSchema>

    export const userLoggedInSchema = t.Object({
        idToken : t.String()
    })
    export type UserLoggedInSchema = UnwrapSchema<typeof userLoggedInSchema>

    export const userLoggedInSuccess = t.Object({
        success : t.Literal(true),
        userId : t.String(),
        isLoggedIn : t.Literal(true)
    })
    export type UserLoggedInSuccess = UnwrapSchema<typeof userLoggedInSuccess>

    export const userLoggedInFailed = t.Object({
        success : t.Literal(false),
        isLoggedIn : t.Literal(false),
        msg : t.String(),
        newUserId : t.String()
    })
    export type UserLoggedInFailed = UnwrapSchema<typeof userLoggedInFailed>

    export const userInfoSchema = t.Object({
        username : t.String({maxLength : 40, minLength : 3}),
        id : t.String(),
        dob : t.String({format : "date-time"}),
        phoneNumber : t.Number(),
        occupation : t.UnionEnum(["STUDENT", "WORKING"]),
        level : t.UnionEnum(["BEGINNER", "MEDIUM", "ADVANCE", "TEST"]),
    })
    export type UserInfoSchema = UnwrapSchema<typeof userInfoSchema>

    export const userInfoSuccess  = t.Object({
        msg : t.String(),
        id : t.String()
    })
    export type UserInfoSuccess = UnwrapSchema< typeof userInfoSuccess>

    export const userInfoFailed = t.Object({
        msg : t.String(), 
        error : t.Any()
    })
    export type UserInfoFailed = UnwrapSchema<typeof userInfoFailed>
    
}