import { unknownRecord } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse any object", () => {
  expectParseSuccess(unknownRecord, {})
  expectParseSuccess(unknownRecord, { a: 1 })
})

test("should not parse null", () => {
  expectParseFailure(unknownRecord, null)
})

test("should not parse an array", () => {
  expectParseFailure(unknownRecord, [])
})
