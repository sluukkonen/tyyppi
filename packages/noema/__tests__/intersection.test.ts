import { fromJson, intersection, number, object } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const ab = intersection(object({ a: number }), object({ b: number }))

test("should parse valid intersections", () => {
  expectParseSuccess(ab, { a: 1, b: 1 })
})

test("should fail to parse non-objects", () => {
  expectParseFailure(ab, null)
})

test("should collect errors from all codecs", () => {
  expectParseFailure(ab, {})
  expectParseFailure(ab, { a: "1", b: "1" })
})

test("should work with complex codecs", () => {
  const complex = intersection(ab, object({ c: fromJson.date }))
  const now = new Date()

  expectParseSuccess(
    complex,
    { a: 1, b: 1, c: now.toISOString() },
    { a: 1, b: 1, c: now }
  )
})
