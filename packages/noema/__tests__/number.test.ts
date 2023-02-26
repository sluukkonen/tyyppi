import { number } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("number", () => {
  test("should parse numbers", () => {
    expectParseSuccess(number, 0)
  })

  test("should fail to parse non-numbers", () => {
    expectParseFailure(number, "1")
  })

  test("should not parse a NaN", () => {
    expectParseFailure(number, NaN)
  })

  test("should not parse Infinity", () => {
    expectParseFailure(number, Infinity)
  })

  test("should not parse -Infinity", () => {
    expectParseFailure(number, -Infinity)
  })
})
