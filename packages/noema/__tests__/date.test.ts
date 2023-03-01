import { date } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse valid date objects", () => {
  expectParseSuccess(date, new Date())
})

test("should reject invalid dates", () => {
  const invalid = new Date("foo")
  expectParseFailure(date, invalid)
})

test("should reject other values", () => {
  expectParseFailure(date, null)
  expectParseFailure(date, "")
  expectParseFailure(date, {})
})
