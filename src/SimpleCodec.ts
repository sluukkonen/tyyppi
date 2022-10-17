import { Codec } from "./Codec.js"
import { ValidationContext } from "./ValidationContext.js"
import { Result } from "./Result.js"
import { identity } from "./utils.js"

export class SimpleCodec<T> extends Codec<T, T> {
  constructor(
    readonly validate: (value: unknown, ctx: ValidationContext) => Result<T>
  ) {
    super(validate, identity)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnySimpleCodec = SimpleCodec<any>
