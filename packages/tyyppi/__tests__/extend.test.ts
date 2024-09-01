import { boolean, extend, number, object, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const codec = object({ a: number, b: string })

test("should create a new object codec, merging the new properties", () => {
  const extended = extend(codec, { c: boolean })
  expectParseSuccess(extended, { a: 0, b: "", c: true })
  expectParseFailure(extended, { a: 0, b: "0" })
})

test("should prefer properties from the right hand side", () => {
  const extended = extend(codec, { b: number })
  expectParseSuccess(extended, { a: 0, b: 1 })
  expectParseFailure(extended, { a: 0, b: "0" })
})
