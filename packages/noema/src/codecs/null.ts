import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { InvalidNull, invalidType } from "../DecodeError.js"
import { NullMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"

export type NullCodec = SimpleCodec<null, InvalidNull, NullMetadata>

const nullCodec: NullCodec = createSimpleCodec(
  (val) => (val === null ? success(null) : failure(invalidType("null", val))),
  {
    tag: "null",
    simple: true,
  }
)

export { nullCodec as null }
