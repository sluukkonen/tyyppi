import { array, length, number } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const smallNumberArray = length(array(number), 1, 2)

test("delegates to the underlying codec if the length is between the minimum and maximum length", () => {
  expectParseSuccess(smallNumberArray, [1])
  expectParseSuccess(smallNumberArray, [1, 2])
})

test("delegates to the underlying codec if length is missing or is not an integer", () => {
  expectParseFailure(smallNumberArray, null)
  expectParseFailure(smallNumberArray, { length: "0" })
  expectParseFailure(smallNumberArray, { length: NaN })
})

test("fails to parse if the length is below the minimum length", () => {
  expectParseFailure(smallNumberArray, [])
})

test("fails to parse if the length is above the maximum length", () => {
  expectParseFailure(smallNumberArray, [1, 2, 3])
})
