import {
  boolean,
  fromJson,
  intersection,
  number,
  object,
  string,
  union,
} from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const ab = intersection(object({ a: number }), object({ b: number }))

test("should parse valid intersections", () => {
  expectParseSuccess(ab, { a: 1, b: 1 })
})

test("should collect errors from all codecs", () => {
  expectParseFailure(ab, null)
  expectParseFailure(ab, {})
  expectParseFailure(ab, { a: "1", b: "1" })
})

test("should work with complex codecs", () => {
  const complex = intersection(ab, object({ c: fromJson.bigint }))

  expectParseSuccess(complex, { a: 1, b: 1, c: "1" }, { a: 1, b: 1, c: 1n })
  expectParseFailure(complex, { a: 1, b: 1, c: 1 })
})

test("should work with non-object types", () => {
  const a = union(number, string)
  const b = union(boolean, number)
  const c = intersection(a, b)

  expectParseSuccess(c, 0)
  expectParseFailure(c, true)
  expectParseFailure(c, "")
})
