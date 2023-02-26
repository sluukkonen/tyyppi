import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { InvalidBigInt, invalidType } from "../DecodeError.js"
import { BigIntMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"

export type BigIntCodec = SimpleCodec<bigint, InvalidBigInt, BigIntMetadata>

export const bigint: BigIntCodec = createSimpleCodec(
  (val) =>
    typeof val === "bigint"
      ? success(val)
      : failure(invalidType("bigint", val)),
  {
    tag: "bigint",
    simple: true,
  }
)
