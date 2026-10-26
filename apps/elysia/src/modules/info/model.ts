import { t } from "elysia"

export namespace UserInfo{
    export const userInfoSchema  = t.Object({
        name : t.String({minLength : 4, maxLength : 40}),
        dob : t.Any(),
        phoneNumber : t.Number({}),
        occupation : t.UnionEnum(["student", "working professional"]),
        level : t.UnionEnum(['beginner', "medium", "advance"])
    })
    export type UserInfoSchema = typeof userInfoSchema.static
}