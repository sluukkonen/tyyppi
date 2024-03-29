import { boolean } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse booleans", () => {
  expectParseSuccess(boolean, true)
  expectParseSuccess(boolean, false)
})

test("should not parse non-booleans", () => {
  expectParseFailure(boolean, "true")
})
