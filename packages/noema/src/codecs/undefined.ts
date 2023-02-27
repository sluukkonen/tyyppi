import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidUndefined, InvalidUndefined } from "../DecodeError.js"
import { UndefinedMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"

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

export { undefinedCodec as undefined }
