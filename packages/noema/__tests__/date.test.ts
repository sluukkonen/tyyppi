import { expectParseFailure, expectParseSuccess } from "./helpers.js"
import { date } from "../src/index.js"

describe("dateFromISOString", () => {
  test("should parse valid ISO dates", () => {
    const now = new Date()
    expectParseSuccess(date, now.toISOString(), now)
  })

  test("should reject non-strings", () => {
    expectParseFailure(date, null, [
      { code: "invalid_string", actual: null, path: [] },
    ])
  })

  test("should reject invalid strings", () => {
    expectParseFailure(date, "asdf", [
      { code: "invalid_iso_string", actual: "asdf", path: [] },
    ])
  })
})
