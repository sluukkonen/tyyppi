import { ErrorBase } from "./errorBase.js"

export interface IsNaN extends ErrorBase {
  readonly code: "is_nan"
}

export type IsNanParams = Partial<IsNaN>

export const isNaNError = (overrides?: IsNanParams): IsNaN => ({
  code: "is_nan",
  message: "Expected a number, received NaN",
  path: [],
  ...overrides,
})
