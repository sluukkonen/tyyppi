import { Issue } from "./issues.js"

export interface Failure {
  ok: false
  issues: Issue[]
}

export interface Success<T> {
  ok: true
  value: T
}

export type Result<T> = Success<T> | Failure
