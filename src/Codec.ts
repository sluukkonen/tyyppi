import { ValidationContext } from "./ValidationContext.js"
import { ParseError } from "./ParseError.js"
import { Result } from "./Result.js"

export class Codec<out I, in out T = I> {
  readonly Input!: I
  readonly Type!: T

  constructor(
    readonly validate: (value: unknown, ctx: ValidationContext) => Result<T>,
    readonly encode: (value: T) => I
  ) {
    this.parse = this.parse.bind(this)
    this.unsafeParse = this.unsafeParse.bind(this)
  }

  unsafeParse(value: unknown): T {
    const result = this.parse(value)
    if (result.ok) return result.value
    else throw new ParseError(result.issues[0].message, result.issues)
  }

  parse(value: unknown): Result<T> {
    return this.validate(value, new ValidationContext(""))
  }
}

export type InputOf<C extends AnyCodec> = C["Input"]
export type TypeOf<C extends AnyCodec> = C["Type"]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyCodec = Codec<any>
