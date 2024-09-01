import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidType } from "../errors/index.js"
import { failure, success } from "../Result.js"

interface BooleanMetadata extends SimpleMetadata {
  readonly tag: "boolean"
}

export type BooleanCodec = SimpleCodec<boolean, BooleanMetadata>

export const boolean: BooleanCodec = createSimpleCodec(
  (val) =>
    typeof val === "boolean"
      ? success(val)
      : failure(invalidType({ val, expected: "boolean" })),
  {
    tag: "boolean",
    simple: true,
  },
)
