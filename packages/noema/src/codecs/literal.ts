import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidLiteral, InvalidLiteral } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { Literal } from "../types.js"

export interface LiteralCodec<T extends Literal>
  extends SimpleCodec<T, InvalidLiteral<T>> {
  readonly metadata: {
    readonly tag: "literal"
    readonly simple: true
    readonly value: T
  }
}

export const literal = <T extends Literal>(value: T): LiteralCodec<T> =>
  createSimpleCodec(
    (val) =>
      val === value || (value !== value && val !== val)
        ? success(val as T)
        : failure(invalidLiteral(value)),
    { tag: "literal", simple: true, value }
  )
