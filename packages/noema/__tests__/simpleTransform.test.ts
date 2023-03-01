import { simpleTransform, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const trimmedString = simpleTransform(string, (s) => s.trim())

test("should run the parsed value through the transformation function", () => {
  expectParseSuccess(trimmedString, "  abc", "abc")
})

test("should fail if the underlying codec fails", () => {
  expectParseFailure(trimmedString, null)
})
