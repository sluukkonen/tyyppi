import { expectParseFailure, expectParseSuccess } from "./helpers.js"
import * as n from "../src/index.js"

describe("null", () => {
  test("should parse null", () => {
    expectParseSuccess(n.null, null)
  })

  test("should not parse other values", () => {
    expectParseFailure(n.null, undefined, [{ code: "invalid_null", path: [] }])
  })
})
