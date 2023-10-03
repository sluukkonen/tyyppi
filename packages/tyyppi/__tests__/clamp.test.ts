import { integer, clamp } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse if value is less than or equal to the minimum", () => {
  const binary = clamp(integer, 0, 1)
  expectParseSuccess(binary, 0)
  expectParseSuccess(binary, 1)
})

test("should fail to parse if value is outside the bounds", () => {
  const binary = clamp(integer, 0, 1)
  expectParseFailure(binary, 2)
  expectParseFailure(binary, -1)
})

test("should fail to parse if value isn't parsed by the underlying codec", () => {
  const binary = clamp(integer, 0, 1)
  expectParseFailure(binary, "")
})
