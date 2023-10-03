import * as t from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse undefined", () => {
  expectParseSuccess(t.undefined, undefined)
})

test("should not parse other values", () => {
  expectParseFailure(t.undefined, null)
  expectParseFailure(t.undefined, "")
})
