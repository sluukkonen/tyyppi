import { array, minLength, number } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("minLength", () => {
  const nonEmptyNumberArray = minLength(array(number), 1)

  test("delegates to the underlying codec if the length is above the minimum length", () => {
    expectParseSuccess(nonEmptyNumberArray, [1])
  })

  test("delegates to the underlying code if length is missing or is not an integer", () => {
    expectParseFailure(nonEmptyNumberArray, null, [
      { code: "invalid_array", path: [] },
    ])
    expectParseFailure(nonEmptyNumberArray, { length: "0" }, [
      { code: "invalid_array", path: [] },
    ])
    expectParseFailure(nonEmptyNumberArray, { length: NaN }, [
      { code: "invalid_array", path: [] },
    ])
  })

  test("fails to parse if the length is below the minimum length", () => {
    expectParseFailure(
      nonEmptyNumberArray,
      [],
      [{ code: "too_short", path: [], length: 0, minLength: 1 }]
    )
  })
})
