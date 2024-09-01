import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidType } from "../errors/index.js"
import { failure, success } from "../Result.js"

interface UndefinedMetadata extends SimpleMetadata {
  readonly tag: "undefined"
}

export type UndefinedCodec = SimpleCodec<undefined, UndefinedMetadata>

const undefinedCodec: UndefinedCodec = createSimpleCodec(
  (val) =>
    val === undefined
      ? success(val)
      : failure(invalidType({ val, expected: "undefined" })),
  {
    tag: "undefined",
    simple: true,
  },
)

export { undefinedCodec, undefinedCodec as undefined }
