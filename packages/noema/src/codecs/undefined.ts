import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { InvalidUndefined } from "../DecodeError.js"
import { UndefinedMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"

type UndefinedCodec = SimpleCodec<
  undefined,
  InvalidUndefined,
  UndefinedMetadata
>

const undefinedCodec: UndefinedCodec = createSimpleCodec(
  (val) =>
    val === undefined
      ? success(undefined)
      : failure({
          code: "invalid_undefined",
          actual: val,
          path: [],
        }),
  {
    tag: "undefined",
    simple: true,
  }
)

export { undefinedCodec as undefined }
