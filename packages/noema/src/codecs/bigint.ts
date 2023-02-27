import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidBigInt, InvalidBigInt } from "../DecodeError.js"
import { BigIntMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"

export type BigIntCodec = SimpleCodec<bigint, InvalidBigInt, BigIntMetadata>

export const bigint: BigIntCodec = createSimpleCodec(
  (val) =>
    typeof val === "bigint" ? success(val) : failure(invalidBigInt(val)),
  {
    tag: "bigint",
    simple: true,
  }
)
