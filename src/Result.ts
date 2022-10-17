import { Issue } from "./Issue.js"

export interface Failure {
  ok: false
  issues: Issue[]
}

export interface Success<out T> {
  ok: true
  value: T
}

export type Result<T> = Success<T> | Failure
