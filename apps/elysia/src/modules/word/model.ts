import { t } from "elysia";
import { UnwrapArray } from "elysia/dist/types";

export namespace WordModel{
    export const getWordMeaningParams = t.Object({
        day_number : t.Union([t.String(), t.Number()]),
        length : t.Number(),
        firstChar : t.Array(t.String())
    })
    export type GetWordMeaningParams = UnwrapArray<typeof getWordMeaningParams>

}