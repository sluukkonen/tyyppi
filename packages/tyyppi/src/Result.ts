import { DecodeError } from "./errors/decodeError.js"

export interface Failure {
  readonly ok: false
  readonly errors: DecodeError[]
}

export interface Success<T> {
  readonly ok: true
  readonly value: T
}

export type Result<T> = Success<T> | Failure
export type AnyResult = Result<any>

export const success = <T>(value: T): Success<T> => ({ ok: true, value })

export const failure = (error: DecodeError): Failure => ({
  ok: false,
  errors: [error],
})

export const failures = (errors: DecodeError[]): Failure => ({
  ok: false,
  errors,
})
