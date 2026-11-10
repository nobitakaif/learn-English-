import { t, type UnwrapSchema } from "elysia"

export namespace UserInfoModel{
    export const userInfoSchema  = t.Object({
        name : t.String({minLength : 4, maxLength : 40}),
        dob : t.Any(),
        phoneNumber : t.Number({}),
        occupation : t.UnionEnum(["student", "working professional"]),
        level : t.UnionEnum(['beginner', "medium", "advance"])
    })
    export type UserInfoSchema = UnwrapSchema<typeof userInfoSchema>

    export const userInfoSuccess = t.Object({
        id : t.String(),
        msg : t.Literal("your info is saved")
    })
    export type UserInfoSuccess = UnwrapSchema<typeof userInfoSuccess>
    export const userInfoFailed = t.Object({
        msg : t.Literal("something went wrong!"),
        error : t.Any()
    })
    export type UserInfoFailed = UnwrapSchema<typeof userInfoFailed>
    
}