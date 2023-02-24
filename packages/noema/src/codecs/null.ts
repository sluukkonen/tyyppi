import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidNull, InvalidNull } from "../DecodeError.js"
import { NullMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"

type NullCodec = SimpleCodec<null, InvalidNull, NullMetadata>

const nullCodec: NullCodec = createSimpleCodec(
  (val) => (val === null ? success(null) : failure(invalidNull())),
  {
    tag: "null",
    simple: true,
  }
)

export { nullCodec as null }
