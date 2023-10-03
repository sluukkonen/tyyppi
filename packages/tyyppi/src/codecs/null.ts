import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidNull, InvalidNull } from "../DecodeError.js"
import { failure, success } from "../Result.js"

interface NullMetadata extends SimpleMetadata {
  readonly tag: "null"
}

export type NullCodec = SimpleCodec<null, InvalidNull, NullMetadata>

const nullCodec: NullCodec = createSimpleCodec(
  (val) => (val === null ? success(null) : failure(invalidNull(val))),
  {
    tag: "null",
    simple: true,
  },
)

export { nullCodec, nullCodec as null }
