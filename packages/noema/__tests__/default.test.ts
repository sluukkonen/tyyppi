import { defaultTo, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should return the default if decoding undefined", () => {
  expectParseSuccess(defaultTo(string, "abc"), undefined, "abc")
})

test("should defer to the underlying codec if the value is not undefined", () => {
  expectParseSuccess(defaultTo(string, "abc"), "foo")
  expectParseFailure(defaultTo(string, "abc"), null)
})
