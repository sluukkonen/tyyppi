import { number, string, union } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should work with a single member", () => {
  expectParseSuccess(union(string), "")
})

test("should work with multiple members", () => {
  expectParseSuccess(union(string, number), "")
  expectParseSuccess(union(string, number), 0)
  expectParseFailure(union(string, number), {})
})
