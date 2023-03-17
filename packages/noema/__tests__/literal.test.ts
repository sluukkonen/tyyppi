import { literal } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse valid literal", () => {
  expectParseSuccess(literal("a"), "a")
})

test("should fail to parse anything else", () => {
  expectParseFailure(literal("a"), "")
  expectParseFailure(literal(0n), "")
})

test("NaN handling", () => {
  expectParseSuccess(literal(NaN), NaN)
})
