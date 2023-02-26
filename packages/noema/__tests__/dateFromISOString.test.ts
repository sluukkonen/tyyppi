import { dateFromISOString } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("dateFromISOString", () => {
  test("should parse valid ISO dates", () => {
    const now = new Date()
    expectParseSuccess(dateFromISOString, now.toISOString(), now)
  })

  test("should reject non-strings", () => {
    expectParseFailure(dateFromISOString, null)
  })

  test("should reject invalid strings", () => {
    expectParseFailure(dateFromISOString, "asdf")
  })
})
