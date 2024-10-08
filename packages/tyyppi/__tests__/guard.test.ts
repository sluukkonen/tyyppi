import { array, errors, guard, number, unknown } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse successfully if the predicate returns true", () => {
  expectParseSuccess(
    guard(unknown, Array.isArray, () => {
      throw new Error("Boom!")
    }),
    [],
  )
})

test("should fail to parse if the predicate returns false", () => {
  expectParseFailure(
    guard(unknown, Array.isArray, () =>
      errors.custom({
        message: "hmm?",
      }),
    ),
    1,
  )
})

test("should fail to parse if the underlying codec fails to parse the value", () => {
  expectParseFailure(
    guard(array(number), Array.isArray, () => {
      throw new Error("Boom!")
    }),
    1,
  )
})
