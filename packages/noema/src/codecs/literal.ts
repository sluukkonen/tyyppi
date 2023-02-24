import { SimpleCodec, createSimpleCodec } from "../Codec.js"
import { LiteralMetadata } from "../Metadata.js"
import { InvalidLiteral } from "../DecodeError.js"
import { failure, success } from "../Result.js"

export type Literal =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | symbol
  | null

type LiteralCodec<T extends Literal> = SimpleCodec<
  T,
  InvalidLiteral<T>,
  LiteralMetadata<T>
>

export const literal = <T extends Literal>(value: T): LiteralCodec<T> =>
  createSimpleCodec(
    (val) =>
      val === value || (value !== value && val !== val)
        ? success(val as T)
        : failure({
            code: "invalid_literal",
            expected: value,
            path: [],
          }),
    { tag: "literal", simple: true, value }
  )
