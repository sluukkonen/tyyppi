import { positiveInteger } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should accept positive integers", () => {
  expectParseSuccess(positiveInteger, 1)
  expectParseSuccess(positiveInteger, 2)
  expectParseSuccess(positiveInteger, 3)
})

test("should not accept 0", () => {
  expectParseFailure(positiveInteger, 0)
})

test("should not accept negative integers", () => {
  expectParseFailure(positiveInteger, -1)
  expectParseFailure(positiveInteger, -2)
  expectParseFailure(positiveInteger, -2)
})

test("should not accept non-integers", () => {
  expectParseFailure(positiveInteger, -0.5)
  expectParseFailure(positiveInteger, 0.5)
})

test("should not accept NaN", () => {
  expectParseFailure(positiveInteger, NaN)
})
