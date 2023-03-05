import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidBigInt, InvalidBigInt } from "../DecodeError.js"
import { failure, success } from "../Result.js"

export interface BigIntCodec extends SimpleCodec<bigint, InvalidBigInt> {
  readonly metadata: {
    readonly tag: "bigint"
    readonly simple: true
  }
}

export const bigint: BigIntCodec = createSimpleCodec(
  (val) =>
    typeof val === "bigint" ? success(val) : failure(invalidBigInt(val)),
  {
    tag: "bigint",
    simple: true,
  }
)
