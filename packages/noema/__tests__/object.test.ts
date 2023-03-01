import { dateFromISOString, number, object, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse an empty object", () => {
  expectParseSuccess(object({}), {})
})

test("should fail to parse non-objects", () => {
  expectParseFailure(object({}), "")
})

test("should parse a valid object", () => {
  expectParseSuccess(object({ a: number, b: string }), { a: 1, b: "1" })
})

test("should parse complex object", () => {
  const now = new Date()
  expectParseSuccess(
    object({ date: dateFromISOString }),
    { date: now.toISOString() },
    { date: now }
  )
})

test("should fail to parse an object with the value", () => {
  expectParseFailure(object({ a: string }), { a: 1 })
})

test("should work with nested objects", () => {
  expectParseSuccess(object({ a: object({ b: string }) }), { a: { b: "" } })
})

test("the path property should work with nested objects", () => {
  expectParseFailure(object({ a: object({ b: string }) }), { a: { b: 0 } })
})

test("should not accept null values", () => {
  expectParseFailure(object({ a: string }), null)
})

test("should not accept arrays", () => {
  expectParseFailure(object({ "0": number }), [0])
})

test("should only consider own properties", () => {
  const obj = Object.assign(Object.create({ a: 1 }), { b: 2, c: 3 })
  expectParseFailure(object({ a: number, b: number, c: number }), obj)
})

test("should strip extra keys", () => {
  expect(object({}).decode({ a: 1, b: 2 })).toEqual({
    ok: true,
    value: {},
  })
})
