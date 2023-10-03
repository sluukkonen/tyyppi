import { fromJson } from "../../src/index.js"
import { expectParseFailure, expectParseSuccess } from "../helpers.js"

test("should parse valid ISO dates", () => {
  const now = new Date()
  expectParseSuccess(fromJson.date, now.toISOString(), now)
})

test("should reject non-strings", () => {
  expectParseFailure(fromJson.date, null)
})

test("should reject invalid strings", () => {
  expectParseFailure(fromJson.date, "")
})
