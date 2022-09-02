import { union, string, number } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("union", () => {
  test("an empty union should not accept any values", () => {
    expectParseFailure(union([]), "")
  })

  test("should work with a single member", () => {
    expectParseSuccess(union([string]), "")
    expectParseFailure(union([]), 0)
  })

  test("should work with multiple members", () => {
    expectParseSuccess(union([string, number]), "")
    expectParseSuccess(union([string, number]), 0)
    expectParseFailure(union([string, number]), {})
  })
})
