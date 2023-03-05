import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidString, InvalidString } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { isString } from "../utils.js"

export interface StringCodec extends SimpleCodec<string, InvalidString> {
  readonly metadata: {
    readonly tag: "string"
    readonly simple: true
  }
}

export const string: StringCodec = createSimpleCodec(
  (val) => (isString(val) ? success(val) : failure(invalidString(val))),
  {
    tag: "string",
    simple: true,
  }
)
