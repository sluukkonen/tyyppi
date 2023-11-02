import { minLength, MinLengthCodec } from "./minLength.js"
import { string, StringCodec } from "./string.js"

export type NonEmptyStringCodec = MinLengthCodec<StringCodec>

export const nonEmptyString: NonEmptyStringCodec = minLength(string, 1)
