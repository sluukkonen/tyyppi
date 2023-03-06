import {
  createCodec,
  createSimpleCodec,
  string,
  success,
  length,
  pattern,
  optional,
} from "../src/index.js"
import { expectParseSuccess } from "./helpers.js"

test("createCodec with two arguments argument assigns default metadata", () => {
  const codec = createCodec(
    (val) => success(val),
    (val) => val
  )
  expect(codec.metadata).toEqual({ simple: false })
})

test("createSimpleCodec with one arguments argument assigns default metadata", () => {
  const codec = createSimpleCodec((val) => success(val))
  expect(codec.metadata).toEqual({ simple: true })
})

test("supports left-to-right piping of combinators for convenience", () => {
  const optionalWhitespaceString = string
    .pipe(length, 1, 1)
    .pipe(pattern, /^\s+$/)
    .pipe(optional)

  expectParseSuccess(optionalWhitespaceString, undefined)
})
