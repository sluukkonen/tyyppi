import { DecodeError } from "./DecodeError.js"
import { TyyppiError } from "./TyyppiError.js"
import { AnyResult, FailureOf, Result, SuccessOf } from "./Result.js"
import { identity } from "./utils.js"

export type IsSimple<C extends AnyCodec> = C["meta"]["simple"]

export interface Metadata {
  readonly simple: boolean
}

export interface SimpleMetadata extends Metadata {
  readonly simple: true
}

export interface Codec<
  I,
  T = I,
  E extends DecodeError = DecodeError,
  M extends Metadata = Metadata,
> {
  decode(this: void, value: unknown): Result<T, E>
  decodeOrThrow(this: void, value: unknown): T
  encode(this: void, value: T): I
  readonly meta: M
  pipe<Args extends readonly unknown[], R>(
    fn: (codec: this, ...args: Args) => R,
    ...args: Args
  ): R
}

export type AnyCodec = Codec<any>

export type InputOf<C extends AnyCodec> =
  C extends Codec<infer I, any> ? I : never
export type TypeOf<C extends AnyCodec> =
  C extends Codec<any, infer T> ? T : never
export type ErrorOf<C extends AnyCodec> =
  C extends Codec<any, any, infer E> ? E : never
export type MetadataOf<C extends AnyCodec> = C["meta"]
export type ResultOf<C extends AnyCodec> = Result<TypeOf<C>, ErrorOf<C>>

export type SimpleCodec<
  T,
  E extends DecodeError = DecodeError,
  M extends SimpleMetadata = SimpleMetadata,
> = Codec<T, T, E, M>
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

export function createCodec<R extends AnyResult, I, M extends Metadata>(
  decode: (value: unknown) => R,
  encode: (value: SuccessOf<R>) => I,
  meta?: M,
): Codec<I, SuccessOf<R>, FailureOf<R>, M> {
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

export function createSimpleCodec<
  R extends AnyResult,
  M extends SimpleMetadata,
>(
  decode: (value: unknown) => R,
  meta?: M,
): SimpleCodec<SuccessOf<R>, FailureOf<R>, M> {
  return createCodec(decode, identity, meta ?? { simple: true }) as SimpleCodec<
    SuccessOf<R>,
    FailureOf<R>,
    M
  >
}
