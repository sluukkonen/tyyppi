import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidLiteral } from "../errors/index.js"
import { failure, success } from "../Result.js"
import { Primitive } from "../types.js"

interface LiteralMetadata<T extends Primitive> extends SimpleMetadata {
  readonly tag: "literal"
  readonly value: T
}

export type LiteralCodec<T extends Primitive> = SimpleCodec<
  T,
  LiteralMetadata<T>
>

export const literal = <T extends Primitive>(value: T): LiteralCodec<T> =>
  createSimpleCodec(
    (val) =>
      val === value || (value !== value && val !== val)
        ? success(val as T)
        : failure(invalidLiteral({ val, expected: value })),
    { tag: "literal", simple: true, value },
  )
