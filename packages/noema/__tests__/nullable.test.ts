import { nullable, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("nullable", () => {
  test("should parse undefined or a value parsed by the underlying codec", () => {
    expectParseSuccess(nullable(string), null)
    expectParseSuccess(nullable(string), "")
  })

  test("should fail to parse other values", () => {
    expectParseFailure(nullable(string), 1, [
      { code: "invalid_string", path: [] },
    ])
  })
})
