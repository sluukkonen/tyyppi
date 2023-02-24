import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { BigIntMetadata } from "../Metadata.js"
import { InvalidBigInt } from "../DecodeError.js"
import { failure, success } from "../Result.js"

type BigIntCodec = SimpleCodec<bigint, InvalidBigInt, BigIntMetadata>

export const bigint: BigIntCodec = createSimpleCodec(
  (val) =>
    typeof val === "bigint"
      ? success(val)
      : failure({
          code: "invalid_bigint",
          actual: val,
          path: [],
        }),
  {
    tag: "bigint",
    simple: true,
  }
)
