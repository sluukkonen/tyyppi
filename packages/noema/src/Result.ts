export interface Failure<E> {
  readonly ok: false
  readonly errors: readonly E[]
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

export const failures = <E>(errors: readonly E[]): Failure<E> => ({
  ok: false,
  errors,
})
