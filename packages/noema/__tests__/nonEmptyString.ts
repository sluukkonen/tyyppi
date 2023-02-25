import { nonEmptyString } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("nonEmptyString", () => {
  test("parses non-empty strings", () => {
    expectParseSuccess(nonEmptyString, "a")
    expectParseSuccess(nonEmptyString, "abc")
  })

  test("doesn't parse empty strings", () => {
    expectParseFailure(nonEmptyString, "", [
      { code: "too_short", path: [], minLength: 1, length: 0 },
    ])
  })

  test("does not parse non-strings", () => {
    expectParseFailure(nonEmptyString, 1, [
      { code: "invalid_string", path: [] },
    ])
  })
})
