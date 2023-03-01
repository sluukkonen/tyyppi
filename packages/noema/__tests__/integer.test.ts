import { integer } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse integers", () => {
  expectParseSuccess(integer, 0)
})

test("should not parse floats", () => {
  expectParseFailure(integer, 0.5)
})

test("should not parse a NaN", () => {
  expectParseFailure(integer, NaN)
})

test("should not parse Infinity", () => {
  expectParseFailure(integer, Infinity)
})

test("should not parse -Infinity", () => {
  expectParseFailure(integer, -Infinity)
})
