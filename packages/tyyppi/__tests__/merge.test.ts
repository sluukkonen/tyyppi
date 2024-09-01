import { boolean, merge, number, object, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const codec = object({ a: number, b: string })

test("should create a new object codec, merging the new properties", () => {
  const merged = merge(codec, object({ c: boolean }))
  expectParseSuccess(merged, { a: 0, b: "", c: true })
  expectParseFailure(merged, { a: 0, b: "0" })
})

test("should prefer properties from the right hand side codec", () => {
  const merged = merge(codec, object({ b: number }))
  expectParseSuccess(merged, { a: 0, b: 1 })
  expectParseFailure(merged, { a: 0, b: "0" })
})
