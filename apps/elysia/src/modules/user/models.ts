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
        msg : t.String()
    })
    export type UserLoggedInFailed = UnwrapSchema<typeof userLoggedInFailed>
}