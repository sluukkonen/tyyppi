import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidType } from "../errors/index.js"
import { failure, success } from "../Result.js"

interface NullMetadata extends SimpleMetadata {
  readonly tag: "null"
}

export type NullCodec = SimpleCodec<null, NullMetadata>

const nullCodec: NullCodec = createSimpleCodec(
  (val) =>
    val === null
      ? success(val)
      : failure(invalidType({ val, expected: "null" })),
  {
    tag: "null",
    simple: true,
  },
)

export { nullCodec, nullCodec as null }
