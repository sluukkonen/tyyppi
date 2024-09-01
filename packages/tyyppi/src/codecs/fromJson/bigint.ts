import { Codec, createCodec, Metadata } from "../../Codec.js"
import { invalidFormat } from "../../errors/index.js"
import { invalidString } from "../../errors/utils.js"
import { failure, success } from "../../Result.js"
import { isString } from "../../utils.js"

interface BigIntMetadata extends Metadata {
  readonly tag: "fromJson.bigint"
  readonly simple: false
}

export type BigIntCodec = Codec<string, bigint, BigIntMetadata>

export const bigint: BigIntCodec = createCodec(
  (val) => {
    if (!isString(val)) return failure(invalidString(val))
    if (!/^[+-]?\d+$/.test(val))
      return failure(invalidFormat({ format: "integer" }))
    return success(BigInt(val))
  },
  (bigint) => bigint.toString(),
  { tag: "fromJson.bigint", simple: false },
)
