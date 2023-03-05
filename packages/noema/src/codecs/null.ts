import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidNull, InvalidNull } from "../DecodeError.js"
import { failure, success } from "../Result.js"

export interface NullCodec extends SimpleCodec<null, InvalidNull> {
  readonly metadata: {
    readonly tag: "null"
    readonly simple: true
  }
}

const nullCodec: NullCodec = createSimpleCodec(
  (val) => (val === null ? success(null) : failure(invalidNull(val))),
  {
    tag: "null",
    simple: true,
  }
)

export { nullCodec, nullCodec as null }
