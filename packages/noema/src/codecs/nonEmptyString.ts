import { minLength, MinLengthCodec } from "./minLength.js"
import { string, StringCodec } from "./string.js"

export type NonEmptyStringCodec = MinLengthCodec<StringCodec>

// For whatever reason, coverage doesn't seem to work here.
/* c8 ignore next */
export const nonEmptyString: NonEmptyStringCodec = minLength(string, 1)
