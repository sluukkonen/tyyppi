import { fromJson, number, set } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse a set containing elements of the correct type", () => {
  expectParseSuccess(set(number), new Set([]))
  expectParseSuccess(set(number), new Set([1]))
  expectParseSuccess(set(number), new Set([1, 2]))
  expectParseSuccess(set(number), new Set([1, 2, 3]))
})

test("should reject values that are not sets", () => {
  expectParseFailure(set(number), [])
})

test("should reject sets containing elements of the wrong type", () => {
  expectParseFailure(set(number), new Set([""]))
})

test("should work with non-simple element codecs", () => {
  expectParseSuccess(set(fromJson.bigint), new Set(["1"]), new Set([1n]))
})
