import { array, maxLength, number, string } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const smallNumberArray = maxLength(array(number), 1)
const smallString = maxLength(string, 1)

test("delegates to the underlying codec if the length is below the maximum length", () => {
  expectParseSuccess(smallNumberArray, [])
  expectParseSuccess(smallNumberArray, [1])
})

test("delegates to the underlying codec if length is missing or is not an integer", () => {
  expectParseFailure(smallNumberArray, null)
  expectParseFailure(smallNumberArray, { length: "0" })
  expectParseFailure(smallNumberArray, { length: NaN })
})

test("fails to parse if the length is above the maximum length", () => {
  expectParseFailure(smallNumberArray, [1, 2])
  expectParseFailure(smallString, "ab")
})
