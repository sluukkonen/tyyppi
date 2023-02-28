import { dateFromISOString, map, number, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("map", () => {
  test("should parse a map with valid key and value types", () => {
    expectParseSuccess(map(string, number), new Map())
    expectParseSuccess(map(string, number), new Map([["a", 1]]))
  })

  test("should reject values that are not maps", () => {
    expectParseFailure(map(string, number), [])
    expectParseFailure(map(string, number), null)
  })

  test("should reject a map with the wrong key type", () => {
    expectParseFailure(map(string, number), new Map([[1, 1]]))
  })

  test("should reject a map with the wrong value type", () => {
    expectParseFailure(map(string, number), new Map([["a", "a"]]))
  })

  test("should work if the key codec not simple", () => {
    const now = new Date()
    expectParseSuccess(
      map(dateFromISOString, number),
      new Map([[now.toISOString(), now.valueOf()]]),
      new Map([[now, now.valueOf()]])
    )
  })

  test("should work if the value codec not simple", () => {
    const now = new Date()
    expectParseSuccess(
      map(number, dateFromISOString),
      new Map([[now.valueOf(), now.toISOString()]]),
      new Map([[now.valueOf(), now]])
    )
  })
})
