import * as t from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse null", () => {
  expectParseSuccess(t.null, null)
})

test("should not parse other values", () => {
  expectParseFailure(t.null, Object.create(null))
  expectParseFailure(t.null, undefined)
  expectParseFailure(t.null, new Map())
  expectParseFailure(t.null, new Set())
  expectParseFailure(t.null, Promise.resolve(1))
  expectParseFailure(t.null, new Error("Boom!"))
  expectParseFailure(t.null, new Date())
  expectParseFailure(t.null, new RegExp(""))
  expectParseFailure(t.null, new String(""))
})
