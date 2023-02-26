import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidType, InvalidUndefined } from "../DecodeError.js"
import { UndefinedMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"

export type UndefinedCodec = SimpleCodec<
  undefined,
  InvalidUndefined,
  UndefinedMetadata
>

const undefinedCodec: UndefinedCodec = createSimpleCodec(
  (val) =>
    val === undefined
      ? success(undefined)
      : failure(invalidType("undefined", val)),
  {
    tag: "undefined",
    simple: true,
  }
)

export { undefinedCodec as undefined }
