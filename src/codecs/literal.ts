import { Codec } from "../Codec.js"
import { identity } from "../utils.js"

export type Literal =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | symbol
  | null

class LiteralCodec<T extends Literal> extends Codec<T, T, true> {
  constructor(readonly value: T) {
    super(
      (val, ctx) =>
        val === value || (value !== value && val !== val)
          ? ctx.success(val as T)
          : ctx.failure({
              code: "invalid_literal",
              path: ctx.path,
              expected: value,
            }),
      identity,
      true
    )
  }
}
export const literal = <T extends Literal>(value: T): LiteralCodec<T> =>
  new LiteralCodec(value)
