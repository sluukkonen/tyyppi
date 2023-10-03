import { email } from "../src/codecs/email.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should accept valid email addresses", () => {
  expectParseSuccess(email, "foo@example.com")
})

test("should not accept other strings", () => {
  expectParseFailure(email, "asdf")
})

test("should not accept non-strings", () => {
  expectParseFailure(email, null)
})
