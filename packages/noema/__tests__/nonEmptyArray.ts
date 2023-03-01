import { nonEmptyArray, number } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const nonEmptyNumberArray = nonEmptyArray(number)

test("accepts non-empty number arrays", () => {
  expectParseSuccess(nonEmptyNumberArray, [1])
  expectParseSuccess(nonEmptyNumberArray, [1, 2, 3])
})

test("does not accept empty arrays", () => {
  expectParseFailure(nonEmptyNumberArray, [])
})

test("does not accept arrays of the wrong type", () => {
  expectParseFailure(nonEmptyNumberArray, ["1"])
})
