import { dateFromISOString, literal, record, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("record", () => {
  test("should parse an simple records", () => {
    expectParseSuccess(record(string, string), {})
    expectParseSuccess(record(string, string), { a: "1" })
    expectParseSuccess(record(string, string), { a: "1", b: "2" })
  })

  test("should parse complex records", () => {
    const now = new Date()
    expectParseSuccess(record(string, dateFromISOString), {})
    expectParseSuccess(
      record(string, dateFromISOString),
      { a: now.toISOString() },
      { a: now }
    )
  })

  test("should not parse records with invalid keys", () => {
    expectParseSuccess(record(literal("a"), string), {} as Record<"a", string>)
    expectParseSuccess(record(literal("a"), string), { a: "1" })
    expectParseFailure(record(literal("a"), string), { a: "1", b: "2" }, [
      { code: "invalid_literal", actual: "b", expected: "a", path: ["b"] },
    ])
  })

  test("should not parse non-objects", () => {
    expectParseFailure(record(string, string), "", [
      { code: "invalid_object", actual: "", path: [] },
    ])
  })

  test("should not parse arrays", () => {
    expectParseFailure(
      record(string, string),
      [],
      [{ code: "invalid_object", actual: [], path: [] }]
    )
  })

  test("should not parse null", () => {
    expectParseFailure(record(string, string), null, [
      { code: "invalid_object", actual: null, path: [] },
    ])
  })

  test("should only consider own properties", () => {
    const obj = Object.assign(Object.create({ a: "1" }), { b: "2", c: "3" })
    expectParseSuccess(record(string, string), obj, { b: "2", c: "3" })
  })

  test("should not parse records with invalid values", () => {
    expectParseFailure(record(string, string), { a: "1", b: 2 }, [
      { code: "invalid_string", actual: 2, path: ["b"] },
    ])
  })

  test("path should nest with nested records", () => {
    expectParseFailure(
      record(string, record(string, string)),
      { a: { b: 1 } },
      [{ code: "invalid_string", actual: 1, path: ["a", "b"] }]
    )
  })
})
