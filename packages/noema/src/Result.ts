import { Issue } from "./Issue.js"

export interface Failure {
  readonly ok: false
  readonly issues: Issue[]
}

export interface Success<T> {
  readonly ok: true
  readonly value: T
}

export type Result<T> = Success<T> | Failure
