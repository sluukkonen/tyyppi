import { max, number } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("min", () => {
  test("should parse if value is less than or equal to the minimum", () => {
    const nonPositiveNumber = max(number, 0)
    expectParseSuccess(nonPositiveNumber, 0)
    expectParseSuccess(nonPositiveNumber, -1)
  })

  test("should fail to parse if value is greater than the minimum", () => {
    const nonPositiveNumber = max(number, 0)
    expectParseFailure(nonPositiveNumber, 1, [
      { code: "too_large", path: [], max: 0 },
    ])
  })

  test("should fail to parse if value isn't parsed by the underlying codec", () => {
    const nonPositiveNumber = max(number, 0)
    expectParseFailure(nonPositiveNumber, "", [
      { code: "invalid_number", path: [] },
    ])
  })
})