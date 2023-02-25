import { NonEmptyArray } from "./codecs/nonEmptyArray.js"

export interface Failure<E> {
  readonly ok: false
  readonly errors: NonEmptyArray<E>
}

export interface Success<T> {
  readonly ok: true
  readonly value: T
}

export type Result<T, E> = Success<T> | Failure<E>

export const success = <T>(value: T): Success<T> => ({ ok: true, value })

export const failure = <E>(error: E): Failure<E> => ({
  ok: false,
  errors: [error],
})

export const failures = <E>(errors: NonEmptyArray<E>): Failure<E> => ({
  ok: false,
  errors,
})
