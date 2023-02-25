import { integer, range } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("min", () => {
  test("should parse if value is less than or equal to the minimum", () => {
    const binary = range(integer, 0, 1)
    expectParseSuccess(binary, 0)
    expectParseSuccess(binary, 1)
  })

  test("should fail to parse if value is outside the bounds", () => {
    const binary = range(integer, 0, 1)
    expectParseFailure(binary, 2, [{ code: "too_large", path: [], max: 1 }])
    expectParseFailure(binary, -1, [{ code: "too_small", path: [], min: 0 }])
  })

  test("should fail to parse if value isn't parsed by the underlying codec", () => {
    const binary = range(integer, 0, 1)
    expectParseFailure(binary, "", [{ code: "invalid_integer", path: [] }])
  })
})
