import { length, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const twoNumbers = length(string, 2)

test("successfully parses if the length is exactly the designed length", () => {
  expectParseSuccess(twoNumbers, "ab")
})

test("fails to parse if length property is missing or is not an integer", () => {
  expectParseFailure(twoNumbers, null)
  expectParseFailure(twoNumbers, { length: "0" })
  expectParseFailure(twoNumbers, { length: NaN })
})

test("fails to parse if the length is below the minimum length", () => {
  expectParseFailure(twoNumbers, "a")
})

test("fails to parse if the length is above the maximum length", () => {
  expectParseFailure(twoNumbers, "abc")
})
