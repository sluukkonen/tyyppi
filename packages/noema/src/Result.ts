export interface Failure<E> {
  readonly ok: false
  readonly errors: readonly E[]
}

export interface Success<T> {
  readonly ok: true
  readonly value: T
}

export type Result<T, E> = Success<T> | Failure<E>

export function success<T>(value: T): Success<T> {
  return { ok: true, value }
}

export function failure<E>(error: E): Failure<E> {
  return { ok: false, errors: [error] }
}

export function failures<E>(errors: readonly E[]): Failure<E> {
  return { ok: false, errors }
}
