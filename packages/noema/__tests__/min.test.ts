import { min, number } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("min", () => {
  test("should parse if value is greater than or equal to the minimum", () => {
    const nonNegativeNumber = min(number, 0)
    expectParseSuccess(nonNegativeNumber, 0)
    expectParseSuccess(nonNegativeNumber, 1)
  })

  test("should fail to parse if value is less than the minimum", () => {
    const nonNegativeNumber = min(number, 0)
    expectParseFailure(nonNegativeNumber, -1, [
      { code: "too_small", path: [], min: 0 },
    ])
  })

  test("should fail to parse if value isn't parsed by the underlying codec", () => {
    const nonNegativeNumber = min(number, 0)
    expectParseFailure(nonNegativeNumber, "", [
      { code: "invalid_number", path: [] },
    ])
  })
})
