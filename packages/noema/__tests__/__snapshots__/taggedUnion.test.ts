import { fromJson, literal, object, taggedUnion } from "../../src/index.js"
import { expectParseFailure, expectParseSuccess } from "../helpers.js"

const Plane = object({ type: literal("plane") })
const Car = object({ type: literal("car") })
const Vehicle = taggedUnion("type", ["plane", Plane], ["car", Car])

test("should parse valid values", () => {
  expectParseSuccess(Vehicle, { type: "car" }, { type: "car" })
  expectParseSuccess(Vehicle, { type: "plane" })
})

test("should fail to parse non-objects", () => {
  expectParseFailure(Vehicle, null)
})

test("should fail to objects without the proper tag", () => {
  expectParseFailure(Vehicle, { foo: "bar" })
})

test("should fail to objects where the tag does not match", () => {
  expectParseFailure(Vehicle, { type: "boat" })
})

test("should work with complex codecs", () => {
  const complex = taggedUnion("type", [
    "complex",
    object({ type: literal("complex"), date: fromJson.date }),
  ])
  const now = new Date()

  expectParseSuccess(
    complex,
    { type: "complex", date: now.toISOString() },
    { type: "complex", date: now }
  )
})
