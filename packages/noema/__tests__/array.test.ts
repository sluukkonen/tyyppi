import { array, fromJson, number, object } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

test("should parse valid arrays", () => {
  expectParseSuccess(array(number), [])
  expectParseSuccess(array(number), [1])
  expectParseSuccess(array(number), [1, 2])
  expectParseSuccess(array(number), [1, 2, 3])
})

test("should parse complex arrays", () => {
  expectParseSuccess(
    array(fromJson.date),
    ["2000-01-01T00:00:00.000Z"],
    [new Date("2000-01-01T00:00:00.000Z")]
  )
})

test("should fail to parse non-arrays", () => {
  expectParseFailure(array(number), 0)
})

test("should fail to parse arrays with invalid values", () => {
  expectParseFailure(array(number), [1, "2", 3])
})

test("the path property works within an object", () => {
  expectParseFailure(object({ a: array(number) }), { a: ["1"] })
})
