import * as n from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("undefined", () => {
  test("should parse undefined", () => {
    expectParseSuccess(n.undefined, undefined)
  })

  test("should not parse other values", () => {
    expectParseFailure(n.undefined, null)
    expectParseFailure(n.undefined, "")
  })
})
