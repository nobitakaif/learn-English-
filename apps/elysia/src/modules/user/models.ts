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

    export const userLoggedInSuccess = t.Union([t.Object({
        isLoggedIn : t.Boolean({default: true}), 
        userId : t.String(),
    }), t.Object({
        isLoggedIn : t.Boolean({default : false}),
        msg : t.String()
    })])
    export type UserLoggedInSuccess = UnwrapSchema<typeof userLoggedInSuccess>

    export const userLoggedInFailed = t.Object({
        msg : t.String(),
        error : t.Any(),
    })
    export type UserLoggedInFailed = UnwrapSchema<typeof userLoggedInFailed>
}