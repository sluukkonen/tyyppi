import { Codec, createCodec, Metadata } from "../../Codec.js"
import {
  invalidIntegerString,
  InvalidIntegerString,
  InvalidString,
  invalidString,
} from "../../DecodeError.js"
import { failure, success } from "../../Result.js"
import { isString } from "../../utils.js"

interface BigIntMetadata extends Metadata {
  readonly tag: "fromJson.bigint"
  readonly simple: false
}

export type BigIntCodec = Codec<
  string,
  bigint,
  InvalidString | InvalidIntegerString,
  BigIntMetadata
>

export const bigint: BigIntCodec = createCodec(
  (val) => {
    if (!isString(val)) return failure(invalidString(val))
    // A string like BigInt("") or BigInt("   ") return 0n
    const trimmed = val.trim()
    if (trimmed === "") return failure(invalidIntegerString())
    try {
      return success(BigInt(trimmed))
    } catch (err) {
      return failure(invalidIntegerString())
    }
  },
  (bigint) => bigint.toString(),
  { tag: "fromJson.bigint", simple: false }
)
