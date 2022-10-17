import { ValidationContext } from "./ValidationContext.js"
import { ParseError } from "./ParseError.js"
import { Result } from "./Result.js"

export class Codec<I, O = I> {
  readonly Input!: I
  readonly Output!: O

  constructor(
    readonly validate: (value: unknown, ctx: ValidationContext) => Result<O>,
    readonly encode: (value: O) => I
  ) {
    this.parse = this.parse.bind(this)
    this.unsafeParse = this.unsafeParse.bind(this)
  }

  unsafeParse(value: unknown): O {
    const result = this.parse(value)
    if (result.ok) return result.value
    else throw new ParseError(result.issues[0].message, result.issues)
  }

  parse(value: unknown): Result<O> {
    return this.validate(value, new ValidationContext(""))
  }
}

export type Input<C extends Codec<any>> = C["Input"]
export type Output<C extends Codec<any>> = C["Output"]
