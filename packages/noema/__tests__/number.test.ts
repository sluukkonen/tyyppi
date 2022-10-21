import { number } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("number", () => {
  test("should parse numbers", () => {
    expectParseSuccess(number, 0)
  })

  test("should fail to parse non-numbers", () => {
    expectParseFailure(number, "1")
  })

  test("should parse a NaN", () => {
    expectParseSuccess(number, NaN)
  })

  test("should parse Infinity", () => {
    expectParseSuccess(number, Infinity)
  })

  test("should parse -Infinity", () => {
    expectParseSuccess(number, -Infinity)
  })
})
