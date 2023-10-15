import { discriminatedUnion, literal, object, fromJson } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should work with simple codecs", () => {
  const codec = discriminatedUnion(
    "type",
    object({ type: literal("a") }),
    object({ type: literal("b"), extra: literal(true) })
  )

  expectParseSuccess(codec, { type: "a" })
  expectParseSuccess(codec, { type: "b", extra: true })
  expectParseFailure(codec, null)
  expectParseFailure(codec, {})
  expectParseFailure(codec, { type: "c" })
})

test("should work with complex codecs", () => {
  const codec = discriminatedUnion(
    "type",
    object({ type: literal("a") }),
    object({ type: literal("b"), extra: fromJson.bigint })
  )

  expectParseSuccess(codec, { type: "a" })
  expectParseSuccess(codec, { type: "b", extra: "1" }, { type: "b", extra: 1n })
  expectParseFailure(codec, null)
  expectParseFailure(codec, {})
  expectParseFailure(codec, { type: "c" })
})
