import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { InvalidNull } from "../DecodeError.js"
import { NullMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"

type NullCodec = SimpleCodec<null, InvalidNull, NullMetadata>

const nullCodec: NullCodec = createSimpleCodec(
  (val) =>
    val === null
      ? success(null)
      : failure({
          code: "invalid_null",
          actual: val,
          path: [],
        }),
  {
    tag: "null",
    simple: true,
  }
)

export { nullCodec as null }
