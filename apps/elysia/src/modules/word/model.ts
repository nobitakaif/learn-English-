import { t } from "elysia";
import { UnwrapArray } from "elysia/dist/types";

export namespace WordModel{
    export const getWordMeaningParams = t.Object({
        countPerLetter : t.Optional(t.Numeric({default : 3})),
        length : t.Optional(t.Number()),
        firstChar : t.Optional(t.String({ maxLength: 1 })),
    })
    export type GetWordMeaningParams = UnwrapArray<typeof getWordMeaningParams>

}