import { negativeInteger } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("negativeInteger", () => {
  test("should accept negative integers", () => {
    expectParseSuccess(negativeInteger, -1)
    expectParseSuccess(negativeInteger, -2)
    expectParseSuccess(negativeInteger, -3)
  })

  test("should not accept 0", () => {
    expectParseFailure(negativeInteger, 0)
  })

  test("should not accept positive integers", () => {
    expectParseFailure(negativeInteger, 1)
    expectParseFailure(negativeInteger, 2)
    expectParseFailure(negativeInteger, 2)
  })

  test("should not accept non-integers", () => {
    expectParseFailure(negativeInteger, -0.5)
    expectParseFailure(negativeInteger, 0.5)
  })

  test("should not accept NaN", () => {
    expectParseFailure(negativeInteger, NaN)
  })
})
