import { nonEmptyString } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("parses non-empty strings", () => {
  expectParseSuccess(nonEmptyString, "a")
  expectParseSuccess(nonEmptyString, "abc")
})

test("doesn't parse empty strings", () => {
  expectParseFailure(nonEmptyString, "")
})

test("does not parse non-strings", () => {
  expectParseFailure(nonEmptyString, 1)
})
