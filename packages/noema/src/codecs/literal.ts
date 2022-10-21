import { SimpleCodec, createSimpleCodec } from "../Codec.js"
import { LiteralMetadata } from "../Metadata.js"

export type Literal =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | symbol
  | null

type LiteralCodec<T extends Literal> = SimpleCodec<T, LiteralMetadata<T>>

export const literal = <T extends Literal>(value: T): LiteralCodec<T> =>
  createSimpleCodec(
    (val, ctx) =>
      val === value || (value !== value && val !== val)
        ? ctx.success(val as T)
        : ctx.failure({
            code: "invalid_literal",
            path: ctx.path,
            expected: value,
          }),
    { tag: "literal", simple: true, value }
  )
