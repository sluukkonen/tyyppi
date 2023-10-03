import { defaultValue, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should return the default if decoding undefined", () => {
  expectParseSuccess(defaultValue(string, "abc"), undefined, "abc")
})

test("should defer to the underlying codec if the value is not undefined", () => {
  expectParseSuccess(defaultValue(string, "abc"), "foo")
  expectParseFailure(defaultValue(string, "abc"), null)
})
