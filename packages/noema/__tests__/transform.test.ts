import { fromJson, string, transform } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

const trimmedString = transform(
  string,
  (s) => s.trim(),
  (s) => s
)

test("should run the parsed value through the transformation function", () => {
  expectParseSuccess(trimmedString, "   abc", "abc")
})

test("should fail if the underlying codec fails", () => {
  expectParseFailure(trimmedString, null)
})

test("should work with non-simple codecs", () => {
  const milliseconds = transform(
    fromJson.date,
    (date) => date.valueOf(),
    (timestamp) => new Date(timestamp)
  )
  const now = new Date()
  expectParseSuccess(milliseconds, now.toISOString(), now.valueOf())
})
