export type Path = (string | number)[]

export interface Issue {
  code: string
  message: string
  path: Path
}

class ParseError extends Error {
  constructor(message: string, public issues: Issue[]) {
    super(message)
  }
}

export interface Failure {
  ok: false
  issues: Issue[]
}

export interface Success<T> {
  ok: true
  value: T
}

export type Result<T> = Success<T> | Failure

class Context {
  readonly path: Path
  readonly issues: Issue[]

  constructor(path: Path) {
    this.path = path
    this.issues = []
  }

  success<T>(value: T): Success<T> {
    return { ok: true, value }
  }

  addIssue(code: string, message: string): void {
    const issue: Issue = { code: "generic", message, path: this.path.slice() }
    this.issues.push(issue)
  }

  failure(code: string, message: string): Failure {
    this.addIssue(code, message)
    return this.failures()
  }

  failures(): Failure {
    return { ok: false, issues: this.issues }
  }

  push(part: string | number) {
    this.path.push(part)
  }

  pop() {
    this.path.pop()
  }
}

export type Validation<I, O> = (value: I, ctx: Context) => Result<O>

export class Codec<I, O = I> {
  readonly Input!: I
  readonly Output!: O

  constructor(readonly validate: Validation<unknown, O>) {
    this.parse = this.parse.bind(this)
    this.unsafeParse = this.unsafeParse.bind(this)
  }

  unsafeParse(value: unknown): O {
    const result = this.parse(value)
    if (result.ok) return result.value
    else throw new ParseError("", result.issues)
  }

  parse(value: unknown): Result<O> {
    return this.validate(value, new Context([]))
  }
}

export type Input<C extends Codec<unknown>> = C["Input"]
export type Output<C extends Codec<unknown>> = C["Output"]

class StringCodec extends Codec<string> {
  readonly tag = "string"
  constructor() {
    super((val, ctx) =>
      typeof val === "string" ? ctx.success(val) : ctx.failure("", "")
    )
  }
}

export const string = new StringCodec()

class NumberCodec extends Codec<number> {
  readonly tag = "number"

  constructor() {
    super((val, ctx) =>
      typeof val === "number" ? ctx.success(val) : ctx.failure("", "")
    )
  }
}

export const number = new NumberCodec()

class ArrayCodec<C extends Codec<I, O>, I, O> extends Codec<I[], O[]> {
  readonly tag = "array"

  constructor(readonly values: C) {
    super((val, ctx) => {
      if (!Array.isArray(val)) return ctx.failure("", "")

      let ok = true
      const array: Output<C>[] = []

      for (let i = 0; i < val.length; i++) {
        ctx.push(i)
        const element = val[i]
        const result = values.validate(element, ctx)
        if (!result.ok) {
          ok = false
          ctx.addIssue("", "")
        } else array.push(result.value)
        ctx.pop()
      }

      return ok ? ctx.success(array) : ctx.failures()
    })
  }
}

export const array = <C extends Codec<unknown>>(
  codec: C
): ArrayCodec<C, Input<C>, Output<C>> => new ArrayCodec(codec)

type UnionInputs<T extends readonly unknown[]> = T extends readonly [
  Codec<infer I, unknown>,
  ...infer Rest
]
  ? I | UnionInputs<Rest>
  : T extends []
  ? never
  : T extends readonly Codec<infer I, unknown>[]
  ? I
  : never

type UnionOutputs<T extends readonly unknown[]> = T extends readonly [
  Codec<unknown, infer O>,
  ...infer Rest
]
  ? O | UnionOutputs<Rest>
  : T extends []
  ? never
  : T extends readonly Codec<unknown, infer O>[]
  ? O
  : never

class UnionCodec<C extends readonly Codec<unknown>[] | [], I, O> extends Codec<
  I,
  O
> {
  constructor(readonly members: C) {
    super((value, ctx) => {
      const innerCtx = new Context(ctx.path)

      for (let i = 0; i < members.length; i++) {
        const codec = members[i]
        const result = codec.validate(value, innerCtx)
        if (result.ok) return ctx.success(result.value) as Success<O>
      }

      return ctx.failure("", "")
    })
  }
}

export const union = <C extends readonly Codec<unknown>[] | []>(
  codecs: C
): UnionCodec<C, UnionInputs<C>, UnionOutputs<C>> => new UnionCodec(codecs)
