import * as crypto from "node:crypto"
import { uuid } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse valid v4 UUIDs", () => {
  expectParseSuccess(uuid, crypto.randomUUID())
})

test("should parse NIL uuid", () => {
  expectParseSuccess(uuid, "00000000-0000-0000-0000-000000000000")
})

test("should not parse other strings", () => {
  expectParseFailure(uuid, "asdf")
})

test("should not parse non-strings", () => {
  expectParseFailure(uuid, null)
})
