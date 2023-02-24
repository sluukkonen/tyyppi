import { object, number, string, dateFromISOString } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("object", () => {
  test("should parse an empty object", () => {
    expectParseSuccess(object({}), {})
  })

  test("should fail to parse non-objects", () => {
    expectParseFailure(object({}), "", [{ code: "invalid_object", path: [] }])
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
    expectParseFailure(object({ a: string }), { a: 1 }, [
      { code: "invalid_string", path: ["a"] },
    ])
  })

  test("should work with nested objects", () => {
    expectParseSuccess(object({ a: object({ b: string }) }), { a: { b: "" } })
  })

  test("the path property should work with nested objects", () => {
    expectParseFailure(object({ a: object({ b: string }) }), { a: { b: 0 } }, [
      { code: "invalid_string", path: ["a", "b"] },
    ])
  })

  test("should not accept null values", () => {
    expectParseFailure(object({ a: string }), null, [
      { code: "invalid_object", path: [] },
    ])
  })

  test("should not accept arrays", () => {
    expectParseFailure(
      object({ "0": number }),
      [0],
      [{ code: "invalid_object", path: [] }]
    )
  })

  test("should only consider own properties", () => {
    const obj = Object.assign(Object.create({ a: 1 }), { b: 2, c: 3 })
    expectParseFailure(object({ a: number, b: number, c: number }), obj, [
      { code: "invalid_number", path: ["a"] },
    ])
  })

  test("should strip extra keys", () => {
    expect(object({}).decode({ a: 1, b: 2 })).toEqual({
      ok: true,
      value: {},
    })
  })
})
