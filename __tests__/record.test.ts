import { record, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("record", () => {
  test("should parse an simple records", () => {
    expectParseSuccess(record(string), {})
    expectParseSuccess(record(string), { a: "1" })
    expectParseSuccess(record(string), { a: "1", b: "2" })
  })

  test("should not parse non-objects", () => {
    expectParseFailure(record(string), "")
  })

  test("should not parse arrays", () => {
    expectParseFailure(record(string), [])
  })

  test("should not parse null", () => {
    expectParseFailure(record(string), null)
  })

  test("should only consider own properties", () => {
    const obj = Object.assign(Object.create({ a: "" }), { b: "2", c: "3" })
    expectParseSuccess(record(string), obj, { b: "2", c: "3" })
  })

  test("should not parse records with invalid values", () => {
    expectParseFailure(record(string), { a: "1", b: 2 })
  })

  test("path should nest with nested records", () => {
    expectParseFailure(record(record(string)), { a: { b: 1 } })
  })
})
