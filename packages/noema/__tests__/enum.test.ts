import { expectParseFailure, expectParseSuccess } from "./helpers.js"
import { enum as enumCodec } from "../src/codecs/enum.js"

describe("enum", () => {
  test("should parse valid members", () => {
    expectParseSuccess(enumCodec(1, 2), 1)
    expectParseSuccess(enumCodec(1, 2), 2)
  })

  test("should reject other values", () => {
    expectParseFailure(enumCodec(1, 2), 3, [
      { code: "invalid_enum", path: [], members: [1, 2] },
    ])
  })
})
