import { string, pattern } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const whitespace = pattern(string, /^\s*$/)

test("should parse strings matching the pattern", () => {
  expectParseSuccess(whitespace, "")
  expectParseSuccess(whitespace, "   ")
})

test("should reject strings not matching the pattern", () => {
  expectParseFailure(whitespace, "abc")
})

test("should reject non-strings", () => {
  expectParseFailure(whitespace, null)
})
