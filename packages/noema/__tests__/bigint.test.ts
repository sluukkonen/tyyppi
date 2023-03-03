import { bigint } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse a bigint", () => {
  expectParseSuccess(bigint, 0n)
})

test("should fail to parse other values", () => {
  expectParseFailure(bigint, 0)
})
