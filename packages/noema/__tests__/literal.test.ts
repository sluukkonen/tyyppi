import { literal } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("literal", () => {
  test("should parse valid literal", () => {
    expectParseSuccess(literal("a"), "a")
  })

  test("should fail to parse anything else", () => {
    expectParseFailure(literal("a"), "", [
      { code: "invalid_literal", expected: "a", path: [] },
    ])
  })

  test("NaN handling", () => {
    expectParseSuccess(literal(NaN), NaN)
  })
})
