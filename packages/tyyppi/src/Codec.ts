import { Result } from "./Result.js"
import { TyyppiError } from "./TyyppiError.js"
import { identity } from "./utils.js"

export type IsSimple<C extends AnyCodec> = C["meta"]["simple"]

export interface Metadata {
  readonly simple: boolean
}

export interface SimpleMetadata extends Metadata {
  readonly simple: true
}

export interface Codec<I, T = I, M extends Metadata = Metadata> {
  decode(this: void, value: unknown): Result<T>
  decodeOrThrow(this: void, value: unknown): T
  encode(this: void, value: T): I
  pipe<Args extends readonly unknown[], R>(
    fn: (codec: this, ...args: Args) => R,
    ...args: Args
  ): R
  readonly meta: M
  readonly Input: I
  readonly Type: T
}

export type AnyCodec = Codec<any>

export type InputOf<C extends AnyCodec> = C["Input"]
export type TypeOf<C extends AnyCodec> = C["Type"]
export type MetadataOf<C extends AnyCodec> = C["meta"]

export type SimpleCodec<T, M extends SimpleMetadata = SimpleMetadata> = Codec<
  T,
  T,
  M
>
export type AnySimpleCodec = SimpleCodec<any>

// Need to do inheritance in ES5 style, since the encode function needs to be
// typed in method style due to strictFunctionTypes.
const codecProto = {
  pipe<C extends AnyCodec, Args extends readonly unknown[], R>(
    this: C,
    fn: (codec: C, ...args: Args) => R,
    ...args: Args
  ): R {
    return fn(this, ...args)
  },
}

export function createCodec<I, T, M extends Metadata>(
  decode: (value: unknown) => Result<T>,
  encode: (value: T) => I,
  meta?: M,
): Codec<I, T, M> {
  function decodeOrThrow(value: unknown) {
    const result = decode(value)
    if (result.ok) return result.value
    const errors = result.errors
    throw new TyyppiError(`Found ${errors.length} error(s)`, errors)
  }
  return Object.assign(Object.create(codecProto), {
    decode,
    decodeOrThrow,
    encode,
    meta: meta ?? { simple: false },
  })
}

export function createSimpleCodec<T, M extends SimpleMetadata>(
  decode: (value: unknown) => Result<T>,
  meta?: M,
): SimpleCodec<T, M> {
  return createCodec(decode, identity, meta ?? { simple: true }) as SimpleCodec<
    T,
    M
  >
}
