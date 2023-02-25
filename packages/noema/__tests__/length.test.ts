import { array, length, number } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("length", () => {
  const smallNumberArray = length(array(number), 1, 2)

  test("delegates to the underlying codec if the length is between the minimum and maximum length", () => {
    expectParseSuccess(smallNumberArray, [1])
    expectParseSuccess(smallNumberArray, [1, 2])
  })

  test("delegates to the underlying codec if length is missing or is not an integer", () => {
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

  test("fails to parse if the length is below the minimum length", () => {
    expectParseFailure(
      smallNumberArray,
      [],
      [{ code: "too_short", path: [], length: 0, minLength: 1 }]
    )
  })

  test("fails to parse if the length is above the maximum length", () => {
    expectParseFailure(
      smallNumberArray,
      [1, 2, 3],
      [{ code: "too_long", path: [], length: 3, maxLength: 2 }]
    )
  })
})
