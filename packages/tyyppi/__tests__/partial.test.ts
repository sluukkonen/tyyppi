import { object, partial, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const abc = object({ a: string, b: string, c: string })
const partialAbc = partial(abc)

test("should accept any subset of the properties", () => {
  expectParseSuccess(partialAbc, {})
  expectParseSuccess(partialAbc, { a: "" })
  expectParseSuccess(partialAbc, { b: "b" })
  expectParseSuccess(partialAbc, { c: "c" })
  expectParseSuccess(partialAbc, { a: "", b: "" })
  expectParseSuccess(partialAbc, { b: "b", c: "" })
  expectParseSuccess(partialAbc, { a: "a", b: "b", c: "c" })
})

test("should accept explicit undefined values", () => {
  expectParseSuccess(partialAbc, { a: "", b: undefined })
})

test("should not accept illegal values", () => {
  expectParseFailure(partialAbc, { a: null })
})

test("should make all props optional", async () => {
  expect(partialAbc.meta.props.a.meta.optional).toBe(true)
  expect(partialAbc.meta.props.b.meta.optional).toBe(true)
  expect(partialAbc.meta.props.c.meta.optional).toBe(true)
})
