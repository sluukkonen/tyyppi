import { NonEmptyArray } from "./codecs/nonEmptyArray.js"
import { DecodeError } from "./DecodeError.js"

export interface Failure<E extends DecodeError> {
  readonly ok: false
  readonly errors: NonEmptyArray<E>
}

export interface Success<T> {
  readonly ok: true
  readonly value: T
}

export type Result<T, E extends DecodeError> = Success<T> | Failure<E>
export type AnyResult = Result<any, DecodeError>

export type SuccessOf<R> = R extends Success<infer T> ? T : never
export type FailureOf<R> = R extends Failure<infer E> ? E : never

export const success = <T>(value: T): Success<T> => ({ ok: true, value })

export const failure = <E extends DecodeError>(error: E): Failure<E> => ({
  ok: false,
  errors: [error],
})

export const failures = <E extends DecodeError>(
  errors: NonEmptyArray<E>,
): Failure<E> => ({
  ok: false,
  errors,
})
