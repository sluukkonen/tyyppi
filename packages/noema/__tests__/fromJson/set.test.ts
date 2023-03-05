import { fromJson, number } from "../../src/index.js"
import { expectParseFailure, expectParseSuccess } from "../helpers.js"

const numberSet = fromJson.set(number)

test("should parse valid arrays to a set", () => {
  expectParseSuccess(numberSet, [], new Set())
  expectParseSuccess(numberSet, [1, 2, 3], new Set([1, 2, 3]))
})

test("should allow duplicate values", () => {
  expectParseSuccess(numberSet, [1, 1, 1], new Set([1]))
})

test("should not parse arrays with invalid values", () => {
  expectParseFailure(numberSet, ["1", "2", "3"])
})

test("should not parse non-arrays", () => {
  expectParseFailure(numberSet, null)
})

test("should support complex codecs", () => {
  const bigints = fromJson.set(fromJson.bigint)
  expectParseSuccess(bigints, ["123", "123"], new Set([123n]))
})
