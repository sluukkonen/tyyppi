import { nonPositiveInteger } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should accept non-positive integers", () => {
  expectParseSuccess(nonPositiveInteger, 0)
  expectParseSuccess(nonPositiveInteger, -1)
  expectParseSuccess(nonPositiveInteger, -2)
  expectParseSuccess(nonPositiveInteger, -3)
})

test("should not accept positive integers", () => {
  expectParseFailure(nonPositiveInteger, 1)
  expectParseFailure(nonPositiveInteger, 2)
  expectParseFailure(nonPositiveInteger, 2)
})

test("should not accept non-integers", () => {
  expectParseFailure(nonPositiveInteger, -0.5)
  expectParseFailure(nonPositiveInteger, 0.5)
})

test("should not accept NaN", () => {
  expectParseFailure(nonPositiveInteger, NaN)
})
