import { fromJson } from "../../src/index.js"
import { expectParseFailure, expectParseSuccess } from "../helpers.js"

test("should parse valid strings", () => {
  expectParseSuccess(fromJson.bigint, "0", 0n)
  expectParseSuccess(fromJson.bigint, "123", 123n)
  expectParseSuccess(fromJson.bigint, "-1000", -1000n)
  expectParseSuccess(fromJson.bigint, "+1000", 1000n)
})

test("should not accept leading or trailing whitespace", () => {
  expectParseFailure(fromJson.bigint, "  123")
  expectParseFailure(fromJson.bigint, "123   ")
  expectParseFailure(fromJson.bigint, "   123   ")
})

test("should not accept binary, octal and hexadecimal numbers", () => {
  expectParseFailure(fromJson.bigint, "0b11")
  expectParseFailure(fromJson.bigint, "0o53")
  expectParseFailure(fromJson.bigint, "0xFF")
  expectParseFailure(fromJson.bigint, "0xff")
})

test("should only accept integers", () => {
  expectParseFailure(fromJson.bigint, "123.45")
})

test("should not parse invalid strings", () => {
  expectParseFailure(fromJson.bigint, "")
  expectParseFailure(fromJson.bigint, "   ")
  expectParseFailure(fromJson.bigint, "asdf")
})

test("should not parse non-strings", () => {
  expectParseFailure(fromJson.bigint, null)
})
