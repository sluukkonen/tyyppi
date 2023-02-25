import { array, maxLength, number } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("maxLength", () => {
  const smallNumberArray = maxLength(array(number), 1)

  test("delegates to the underlying codec if the length is below the maximum length", () => {
    expectParseSuccess(smallNumberArray, [])
    expectParseSuccess(smallNumberArray, [1])
  })

  test("delegates to the underlying code if length is missing or is not an integer", () => {
    expectParseFailure(smallNumberArray, null, [
      { code: "invalid_array", path: [] },
    ])
    expectParseFailure(smallNumberArray, { length: "0" }, [
      { code: "invalid_array", path: [] },
    ])
    expectParseFailure(smallNumberArray, { length: NaN }, [
      { code: "invalid_array", path: [] },
    ])
  })

  test("fails to parse if the length is above the maximum length", () => {
    expectParseFailure(
      smallNumberArray,
      [1, 2],
      [{ code: "too_long", path: [], length: 2, maxLength: 1 }]
    )
  })
})
