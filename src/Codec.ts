import { ValidationContext } from "./ValidationContext.js"
import { ParseError } from "./ParseError.js"
import { Result } from "./Result.js"

export class Codec<I, T = I, S extends boolean = boolean> {
  readonly Input!: I
  readonly Type!: T

  constructor(
    readonly validate: (value: unknown, ctx: ValidationContext) => Result<T>,
    readonly encode: (value: T) => I,
    readonly simple: S
  ) {
    this.decode = this.decode.bind(this)
    this.unsafeDecode = this.unsafeDecode.bind(this)
  }

  unsafeDecode(value: unknown): T {
    const result = this.decode(value)
    if (result.ok) return result.value
    else throw new ParseError("", result.issues)
  }

  decode(value: unknown): Result<T> {
    return this.validate(value, new ValidationContext(""))
  }
}

export type InputOf<C extends AnyCodec> = C["Input"]
export type TypeOf<C extends AnyCodec> = C["Type"]
export type SimpleOf<C extends AnyCodec> = C["simple"]

export type AnyCodec = Codec<any, any, boolean>
export type SimpleCodec<T> = Codec<T, T, true>
export type AnySimpleCodec = SimpleCodec<any>
