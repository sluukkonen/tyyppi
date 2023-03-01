import { nonNegativeInteger } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should accept non-negative integers", () => {
  expectParseSuccess(nonNegativeInteger, 0)
  expectParseSuccess(nonNegativeInteger, 1)
  expectParseSuccess(nonNegativeInteger, 2)
  expectParseSuccess(nonNegativeInteger, 3)
})

test("should not accept negative integers", () => {
  expectParseFailure(nonNegativeInteger, -1)
  expectParseFailure(nonNegativeInteger, -2)
  expectParseFailure(nonNegativeInteger, -2)
})

test("should not accept non-integers", () => {
  expectParseFailure(nonNegativeInteger, -0.5)
  expectParseFailure(nonNegativeInteger, 0.5)
})

test("should not accept NaN", () => {
  expectParseFailure(nonNegativeInteger, NaN)
})
