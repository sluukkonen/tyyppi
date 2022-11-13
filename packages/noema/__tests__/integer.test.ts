import { integer } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("integer", () => {
  test("should parse integers", () => {
    expectParseSuccess(integer, 0)
  })

  test("should reject other values", () => {
    expectParseFailure(integer, 0.5, [
      { code: "invalid_integer", actual: 0.5, path: [] },
    ])
  })
})
