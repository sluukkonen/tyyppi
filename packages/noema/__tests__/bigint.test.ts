import { bigint } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

describe("bigint", () => {
  test("should parse bigints", () => {
    expectParseSuccess(bigint, 0n)
  })

  test("should fail to parse other values", () => {
    expectParseFailure(bigint, 0, [
      { code: "invalid_bigint", actual: 0, path: [] },
    ])
  })
})
