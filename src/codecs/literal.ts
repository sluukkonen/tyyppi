import { SimpleCodec } from "../SimpleCodec.js"

export type Literal =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | symbol
  | null

export class LiteralCodec<T extends Literal> extends SimpleCodec<T> {
  constructor(readonly value: T) {
    super((val, ctx) =>
      val === value || (value !== value && val !== val)
        ? ctx.success(val as T)
        : ctx.failure({
            code: "invalid_literal",
            path: ctx.path,
            expected: value,
          })
    )
  }
}
export const literal = <T extends Literal>(value: T): LiteralCodec<T> =>
  new LiteralCodec(value)
