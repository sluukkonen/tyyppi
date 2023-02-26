import { number, string, union } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("union", () => {
  test("should work with a single member", () => {
    expectParseSuccess(union(string), "")
  })

  test("should work with multiple members", () => {
    expectParseSuccess(union(string, number), "")
    expectParseSuccess(union(string, number), 0)
    expectParseFailure(union(string, number), {}, [
      {
        code: "invalid_union",
        path: [],
        errors: [
          { code: "invalid_string", path: [] },
          { code: "invalid_number", path: [] },
        ],
      },
    ])
  })
})
