import { optional } from "../src/codecs/optional.js"
import { string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("optional", () => {
  test("should parse undefined or a value parsed by the underlying codec", () => {
    expectParseSuccess(optional(string), undefined)
    expectParseSuccess(optional(string), "")
  })

  test("should fail to parse other values", () => {
    expectParseFailure(optional(string), 1)
  })
})
