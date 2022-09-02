import { array, number, object } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("array", () => {
  test("should parse a valid array", () => {
    expectParseSuccess(array(number), [1])
  })

  test("should fail to parse non-arrays", () => {
    expectParseFailure(array(number), 0)
  })

  test("should parse empty arrays", () => {
    expectParseSuccess(array(number), [])
  })

  test("should fail to parse arrays with invalid values", () => {
    expectParseFailure(array(number), [1, "2", 3])
  })

  test("the path property works within an object", () => {
    expectParseFailure(object({ a: array(number) }), { a: ["1"] })
  })
})
