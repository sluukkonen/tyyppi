import { errors, refinement, string, unknown } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse successfully if the predicate returns true", () => {
  expectParseSuccess(
    refinement(
      unknown,
      () => true,
      () => {
        throw new Error("Boom!")
      },
    ),
    1,
  )
})

test("should fail to parse if the predicate returns false", () => {
  expectParseFailure(
    refinement(
      unknown,
      () => false,
      () => errors.custom({ message: "hmm?" }),
    ),
    1,
  )
})

test("should fail to parse if the underlying codec fails to parse the value", () => {
  expectParseFailure(
    refinement(
      string,
      () => true,
      () => {
        throw new Error("Boom!")
      },
    ),
    1,
  )
})

test("should allow configuring the metadata", () => {
  const meta = { tag: "hmm", simple: true }
  const codec = refinement(
    string,
    () => true,
    () => errors.custom({ message: "hmm?" }),
    meta,
  )
  expect(codec.meta).toEqual(meta)
})
