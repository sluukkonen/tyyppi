import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidBigInt, InvalidBigInt } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { isBigInt } from "../utils.js"

interface BigIntMetadata extends SimpleMetadata {
  readonly tag: "bigint"
}

export type BigIntCodec = SimpleCodec<bigint, InvalidBigInt, BigIntMetadata>

export const bigint: BigIntCodec = createSimpleCodec(
  (val) => (isBigInt(val) ? success(val) : failure(invalidBigInt(val))),
  {
    tag: "bigint",
    simple: true,
  },
)
