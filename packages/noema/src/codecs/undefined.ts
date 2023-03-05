import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidUndefined, InvalidUndefined } from "../DecodeError.js"
import { failure, success } from "../Result.js"

export interface UndefinedCodec
  extends SimpleCodec<undefined, InvalidUndefined> {
  readonly metadata: {
    readonly tag: "undefined"
    readonly simple: true
  }
}

const undefinedCodec: UndefinedCodec = createSimpleCodec(
  (val) =>
    val === undefined ? success(undefined) : failure(invalidUndefined(val)),
  {
    tag: "undefined",
    simple: true,
  }
)

export { undefinedCodec, undefinedCodec as undefined }
