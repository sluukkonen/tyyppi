import { ErrorBase } from "./errorBase.js"

export interface InvalidInteger extends ErrorBase {
  readonly code: "invalid_integer"
}

export type InvalidIntegerParams = Partial<InvalidInteger>

export const invalidInteger = (
  overrides?: InvalidIntegerParams,
): InvalidInteger => ({
  code: "invalid_integer",
  message: "Expected the number to be an integer",
  path: [],
  ...overrides,
})
