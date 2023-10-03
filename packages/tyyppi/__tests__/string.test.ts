import { string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse strings", () => {
  expectParseSuccess(string, "")
  expectParseSuccess(string, "a")
  expectParseSuccess(string, "123")
})

test("should fail to parse non-strings", () => {
  expectParseFailure(string, 0)
})
