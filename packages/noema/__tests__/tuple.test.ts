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
    expectParseFailure(
      tuple([number]),
      [],
      [{ code: "invalid_tuple", path: [] }]
    )
    expectParseFailure(
      tuple([number]),
      [1, 2],
      [{ code: "invalid_tuple", path: [] }]
    )
  })

  test("should reject invalid values", () => {
    expectParseFailure(tuple([]), null, [{ code: "invalid_tuple", path: [] }])
    expectParseFailure(
      tuple([number, number]),
      [1, "2"],
      [{ code: "invalid_number", path: [1] }]
    )
  })
})
