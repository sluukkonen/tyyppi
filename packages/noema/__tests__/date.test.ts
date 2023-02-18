import { date } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("date", () => {
  test("should parse valid date objects", () => {
    expectParseSuccess(date, new Date())
  })

  test("should reject invalid dates", () => {
    const invalid = new Date("foo")
    expectParseFailure(date, invalid, [
      { code: "invalid_date", actual: invalid, path: [] },
    ])
  })

  test("should reject other values", () => {
    expectParseFailure(date, null, [
      { code: "invalid_date", actual: null, path: [] },
    ])
    expectParseFailure(date, "", [
      { code: "invalid_date", actual: "", path: [] },
    ])
    expectParseFailure(date, {}, [
      { code: "invalid_date", actual: {}, path: [] },
    ])
  })
})
