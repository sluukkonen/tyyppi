import { ErrorBase } from "./errorBase.js"

export interface IsInfinite extends ErrorBase {
  readonly code: "is_infinite"
}

export interface IsInfiniteParams extends Partial<IsInfinite> {
  readonly val: number
}

export const isInfinite = ({
  val,
  ...overrides
}: IsInfiniteParams): IsInfinite => ({
  code: "is_infinite",
  message: `Expected a finite number, received ${val}`,
  path: [],
  ...overrides,
})
