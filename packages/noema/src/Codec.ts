import { DecodeError } from "./DecodeError.js"
import { NoemaError } from "./NoemaError.js"
import { Result } from "./Result.js"
import { identity } from "./utils.js"

export type IsSimple<C extends AnyCodec> = C["metadata"]["simple"]

export interface Metadata {
  readonly simple: boolean
}

export interface SimpleMetadata extends Metadata {
  readonly simple: true
}

export interface Codec<I, T = I, E extends DecodeError = DecodeError> {
  decode(value: unknown): Result<T, E>
  encode(value: T): I
  readonly metadata: Metadata
  unsafeDecode(value: unknown): T
  pipe<Args extends readonly unknown[], R>(
    fn: (codec: this, ...args: Args) => R,
    ...args: Args
  ): R
}

export type AnyCodec = Codec<any>

export type InputOf<C extends AnyCodec> = C extends Codec<infer I, any>
  ? I
  : never
export type TypeOf<C extends AnyCodec> = C extends Codec<any, infer T>
  ? T
  : never
export type ErrorOf<C extends AnyCodec> = C extends Codec<any, any, infer E>
  ? E
  : never
export type MetadataOf<C extends AnyCodec> = C["metadata"]
export type ResultOf<C extends AnyCodec> = Result<TypeOf<C>, ErrorOf<C>>

export interface SimpleCodec<T, E extends DecodeError = DecodeError>
  extends Codec<T, T, E> {
  readonly metadata: SimpleMetadata
}
export type AnySimpleCodec = SimpleCodec<any>

function pipe<C extends AnyCodec, Args extends readonly unknown[], R>(
  this: C,
  fn: (codec: C, ...args: Args) => R,
  ...args: Args
): R {
  return fn(this, ...args)
}

export function createCodec<I, T, E extends DecodeError>(
  decode: (value: unknown) => Result<T, E>,
  encode: (value: T) => I
): Codec<I, T, E>
export function createCodec<I, T, E extends DecodeError, M extends Metadata>(
  decode: (value: unknown) => Result<T, E>,
  encode: (value: T) => I,
  metadata: M
): Codec<I, T, E> & { readonly metadata: M }
export function createCodec<I, T, E extends DecodeError>(
  decode: (value: unknown) => Result<T, E>,
  encode: (value: T) => I,
  metadata: Metadata = { simple: false }
): Codec<I, T, E> {
  const unsafeDecode = (value: unknown) => {
    const result = decode(value)
    if (result.ok) return result.value
    else throw new NoemaError("", result.errors)
  }
  return {
    decode,
    encode,
    metadata,
    unsafeDecode,
    pipe,
  }
}

export function createSimpleCodec<T, E extends DecodeError>(
  decode: (value: unknown) => Result<T, E>
): SimpleCodec<T, E>
export function createSimpleCodec<
  T,
  E extends DecodeError,
  M extends SimpleMetadata = { simple: true }
>(
  decode: (value: unknown) => Result<T, E>,
  metadata: M
): SimpleCodec<T, E> & { readonly metadata: M }
export function createSimpleCodec<T, E extends DecodeError>(
  decode: (value: unknown) => Result<T, E>,
  metadata: SimpleMetadata = { simple: true }
): SimpleCodec<T, E> {
  return createCodec(decode, identity, metadata)
}
