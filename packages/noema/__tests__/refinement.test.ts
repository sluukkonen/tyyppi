import { refinement, string, unknown } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse successfully if the predicate returns true", () => {
  expectParseSuccess(
    refinement(
      unknown,
      () => true,
      () => {
        throw "Boom!"
      }
    ),
    1
  )
})

test("should fail to parse if the predicate returns false", () => {
  expectParseFailure(
    refinement(
      unknown,
      () => false,
      () => ({ code: "hmm", path: [] })
    ),
    1
  )
})

test("should fail to parse if the underlying codec fails to parse the value", () => {
  expectParseFailure(
    refinement(
      string,
      () => true,
      () => {
        throw "Boom!"
      }
    ),
    1
  )
})

test("should allow configuring the metadata", () => {
  const meta = { tag: "hmm", simple: true }
  const codec = refinement(
    string,
    () => true,
    () => ({ code: "hmm", path: [] }),
    meta
  )
  expect(codec.meta).toEqual(meta)
})
