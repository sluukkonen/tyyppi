import { fromJson, literal, record, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse an simple records", () => {
  expectParseSuccess(record(string, string), {})
  expectParseSuccess(record(string, string), { a: "1" })
  expectParseSuccess(record(string, string), { a: "1", b: "2" })
})

test("should parse complex records", () => {
  expectParseSuccess(record(string, fromJson.bigint), {})
  expectParseSuccess(record(string, fromJson.bigint), { a: "1" }, { a: 1n })
})

test("should not parse records with invalid keys", () => {
  expectParseSuccess(record(literal("a"), string), {} as Record<"a", string>)
  expectParseSuccess(record(literal("a"), string), { a: "1" })
  expectParseFailure(record(literal("a"), string), { a: "1", b: "2" })
})

test("should not parse non-objects", () => {
  expectParseFailure(record(string, string), "")
})

test("should not parse arrays", () => {
  expectParseFailure(record(string, string), [])
})

test("should not parse null", () => {
  expectParseFailure(record(string, string), null)
})

test("should only consider own properties", () => {
  const obj = Object.assign(Object.create({ a: "1" }), { b: "2", c: "3" })
  expectParseSuccess(record(string, string), obj)
})

test("should not parse records with invalid values", () => {
  expectParseFailure(record(string, string), { a: "1", b: 2 })
})

test("path should nest with nested records", () => {
  expectParseFailure(record(string, record(string, string)), { a: { b: 1 } })
})
