import { dateFromISOString, number, string, tuple } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("tuple", () => {
  test("should parse a simple tuples", () => {
    expectParseSuccess(tuple([]), [])
    expectParseSuccess(tuple([number]), [1])
    expectParseSuccess(tuple([number, string]), [1, ""])
  })

  test("should parse complex tuples", () => {
    const now = new Date()
    expectParseSuccess(tuple([dateFromISOString]), [now.toISOString()], [now])
  })

  test("should reject arrays that have incorrect length", () => {
    expectParseFailure(tuple([number]), [])
    expectParseFailure(tuple([number]), [1, 2])
  })

  test("should reject invalid values", () => {
    expectParseFailure(tuple([]), null)
    expectParseFailure(tuple([number, number]), [1, "2"])
  })
})
