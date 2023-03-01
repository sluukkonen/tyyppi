import { array, minLength, number } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const nonEmptyNumberArray = minLength(array(number), 1)

test("delegates to the underlying codec if the length is above the minimum length", () => {
  expectParseSuccess(nonEmptyNumberArray, [1])
})

test("delegates to the underlying code if length is missing or is not an integer", () => {
  expectParseFailure(nonEmptyNumberArray, null)
  expectParseFailure(nonEmptyNumberArray, { length: "0" })
  expectParseFailure(nonEmptyNumberArray, { length: NaN })
})

test("fails to parse if the length is below the minimum length", () => {
  expectParseFailure(nonEmptyNumberArray, [])
})
