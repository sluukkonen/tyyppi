import { ErrorBase } from "./errorBase.js"

export interface Custom extends ErrorBase {
  readonly code: "custom"
  readonly params: Record<string, unknown>
}

export type CustomParams = Partial<Custom> & Pick<Custom, "message">

export const custom = ({ message, ...overrides }: CustomParams): Custom => ({
  code: "custom",
  message,
  params: {},
  path: [],
  ...overrides,
})
