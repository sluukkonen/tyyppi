import { fromJson } from "../../src/index.js"
import { expectParseFailure, expectParseSuccess } from "../helpers.js"

test("should parse valid strings", () => {
  expectParseSuccess(fromJson.bigint, "0", 0n)
  expectParseSuccess(fromJson.bigint, "123", 123n)
  expectParseSuccess(fromJson.bigint, "-1000", -1000n)
})

test("should ignore leading and trailing whitespace", () => {
  expectParseSuccess(fromJson.bigint, "  123", 123n)
  expectParseSuccess(fromJson.bigint, "123   ", 123n)
  expectParseSuccess(fromJson.bigint, "   123   ", 123n)
})

test("should allow binary, octal and hexadecimal numbers", () => {
  expectParseSuccess(fromJson.bigint, "0b11", 3n)
  expectParseSuccess(fromJson.bigint, "0o53", 43n)
  expectParseSuccess(fromJson.bigint, "0xFF", 255n)
  expectParseSuccess(fromJson.bigint, "0xff", 255n)
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
