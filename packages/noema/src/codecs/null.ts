import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidNull, InvalidNull } from "../DecodeError.js"
import { NullMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"

export type NullCodec = SimpleCodec<null, InvalidNull, NullMetadata>

const nullCodec: NullCodec = createSimpleCodec(
  (val) => (val === null ? success(null) : failure(invalidNull(val))),
  {
    tag: "null",
    simple: true,
  }
)

export { nullCodec, nullCodec as null }
