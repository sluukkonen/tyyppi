import { string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("string", () => {
  test("should parse strings", () => {
    expectParseSuccess(string, "")
  })

  test("should fail to parse non-strings", () => {
    expectParseFailure(string, 0)
  })
})
