import { expectParseFailure, expectParseSuccess } from "./helpers.js"
import * as n from "../src/index.js"

describe("undefined", () => {
  test("should parse undefined", () => {
    expectParseSuccess(n.undefined, undefined)
  })

  test.each([
    [null, "invalid_undefined" as const],
    [0, "invalid_undefined" as const],
    ["noema", "invalid_undefined" as const],
    [{}, "invalid_undefined" as const],
    [[], "invalid_undefined" as const],
    [true, "invalid_undefined" as const],
    [false, "invalid_undefined" as const],
    [() => 1, "invalid_undefined" as const],
  ])("should not parse other values", (actual, code) => {
    expectParseFailure(n.undefined, actual, [{ code: code, path: [] }])
  })
})
