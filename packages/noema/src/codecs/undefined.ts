import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidUndefined, InvalidUndefined } from "../DecodeError.js"
import { failure, success } from "../Result.js"

interface UndefinedMetadata extends SimpleMetadata {
  readonly tag: "undefined"
}

export type UndefinedCodec = SimpleCodec<
  undefined,
  InvalidUndefined,
  UndefinedMetadata
>

const undefinedCodec: UndefinedCodec = createSimpleCodec(
  (val) =>
    val === undefined ? success(undefined) : failure(invalidUndefined(val)),
  {
    tag: "undefined",
    simple: true,
  }
)

export { undefinedCodec, undefinedCodec as undefined }
