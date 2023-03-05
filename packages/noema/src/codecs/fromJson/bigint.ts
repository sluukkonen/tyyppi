import { Codec, createCodec } from "../../Codec.js"
import {
  invalidIntegerString,
  InvalidIntegerString,
  InvalidString,
  invalidString,
} from "../../DecodeError.js"
import { failure, Result, success } from "../../Result.js"
import { isString } from "../../utils.js"

export interface BigIntCodec
  extends Codec<string, bigint, InvalidString | InvalidIntegerString> {
  readonly metadata: {
    tag: "fromJson.bigint"
    readonly simple: false
  }
}

export const bigint: BigIntCodec = createCodec(
  (val): Result<bigint, InvalidString | InvalidIntegerString> => {
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
