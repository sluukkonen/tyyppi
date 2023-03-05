import { fromJson, integer, string } from "../../src/index.js"
import { expectParseFailure, expectParseSuccess } from "../helpers.js"

const stringToInt = fromJson.map(string, integer)

test("should parse valid arrays to a map", () => {
  expectParseSuccess(stringToInt, [], new Map())
  expectParseSuccess(stringToInt, [["a", 1]], new Map([["a", 1]]))
})

test("should not accept arrays containing invalid keys", () => {
  expectParseFailure(stringToInt, [[1, 1]])
})

test("should not accept arrays containing invalid values", () => {
  expectParseFailure(stringToInt, [["1", "1"]])
})

test("should not accept non-arrays", () => {
  expectParseFailure(stringToInt, null)
})

test("should not accept too short tuples", () => {
  expectParseFailure(stringToInt, [["a"]])
})

test("should not accept too long tuples", () => {
  expectParseFailure(stringToInt, [["a", 1, "extra"]])
})

test("should not accept arrays containing non-arrays", () => {
  expectParseFailure(stringToInt, [null])
})

test("should support complex key codecs", () => {
  const complex = fromJson.map(fromJson.bigint, string)
  expectParseSuccess(complex, [["1", "1"]], new Map([[1n, "1"]]))
})

test("should support complex value codecs", () => {
  const complex = fromJson.map(string, fromJson.bigint)
  expectParseSuccess(complex, [["1", "1"]], new Map([["1", 1n]]))
})
