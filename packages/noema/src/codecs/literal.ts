import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidLiteral, InvalidLiteral } from "../DecodeError.js"
import { LiteralMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"
import { Literal } from "../types.js"

export type LiteralCodec<T extends Literal> = SimpleCodec<
  T,
  InvalidLiteral<T>,
  LiteralMetadata<T>
>

export const literal = <T extends Literal>(value: T): LiteralCodec<T> =>
  createSimpleCodec(
    (val) =>
      val === value || (value !== value && val !== val)
        ? success(val as T)
        : failure(invalidLiteral(value)),
    { tag: "literal", simple: true, value }
  )
