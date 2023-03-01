import * as n from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse null", () => {
  expectParseSuccess(n.null, null)
})

test("should not parse other values", () => {
  expectParseFailure(n.null, Object.create(null))
  expectParseFailure(n.null, undefined)
  expectParseFailure(n.null, new Map())
  expectParseFailure(n.null, new Set())
  expectParseFailure(n.null, Promise.resolve(1))
  expectParseFailure(n.null, new Error("Boom!"))
  expectParseFailure(n.null, new Date())
  expectParseFailure(n.null, new RegExp(""))
  expectParseFailure(n.null, new String(""))
})
