import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"

import { invalidType } from "../errors/index.js"
import { failure, success } from "../Result.js"
import { isBigInt } from "../utils.js"

interface BigIntMetadata extends SimpleMetadata {
  readonly tag: "bigint"
}

export type BigIntCodec = SimpleCodec<bigint, BigIntMetadata>

export const bigint: BigIntCodec = createSimpleCodec(
  (val) =>
    isBigInt(val)
      ? success(val)
      : failure(invalidType({ val, expected: "bigint" })),
  {
    tag: "bigint",
    simple: true,
  },
)
