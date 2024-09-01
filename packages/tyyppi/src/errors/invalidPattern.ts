import { ErrorBase } from "./errorBase.js"

export interface InvalidPattern extends ErrorBase {
  readonly code: "invalid_pattern"
  readonly pattern: string
}

export interface InvalidPatternParams extends Partial<InvalidPattern> {
  readonly regexp: RegExp
}

export const invalidPattern = ({
  regexp,
  ...overrides
}: InvalidPatternParams): InvalidPattern => {
  const pattern = regexp.toString()
  return {
    code: "invalid_pattern",
    message: `Expected the string to match the pattern ${pattern}`,
    pattern,
    path: [],
    ...overrides,
  }
}
