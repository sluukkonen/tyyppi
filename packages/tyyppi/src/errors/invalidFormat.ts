import { ErrorBase } from "./errorBase.js"
import { PartialPick } from "./utils.js"

export interface InvalidFormat extends ErrorBase {
  readonly code: "invalid_format"
  readonly format: string
}

export type InvalidFormatParams = PartialPick<InvalidFormat, "format">

export const invalidFormat = ({
  format,
  ...overrides
}: InvalidFormatParams): InvalidFormat => ({
  code: "invalid_format",
  message: `Invalid ${format}`,
  format,
  path: [],
  ...overrides,
})
