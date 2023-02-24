import { expectParseFailure, expectParseSuccess } from "./helpers.js"
import { dateFromISOString } from "../src/index.js"

describe("dateFromISOString", () => {
  test("should parse valid ISO dates", () => {
    const now = new Date()
    expectParseSuccess(dateFromISOString, now.toISOString(), now)
  })

  test("should reject non-strings", () => {
    expectParseFailure(dateFromISOString, null, [
      { code: "invalid_string", path: [] },
    ])
  })

  test("should reject invalid strings", () => {
    expectParseFailure(dateFromISOString, "asdf", [
      { code: "invalid_iso_string", path: [] },
    ])
  })
})