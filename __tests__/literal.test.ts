import { expectParseFailure, expectParseSuccess } from "./helpers.js"
import { literal } from "../src/index.js"

describe("literal", () => {
  test("should parse valid literal", () => {
    expectParseSuccess(literal("a"), "a")
  })

  test("should fail to parse anything else", () => {
    expectParseFailure(literal("a"), "")
  })

  test("NaN handling", () => {
    expectParseSuccess(literal(NaN), NaN)
  })
})
