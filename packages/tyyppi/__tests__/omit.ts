import { number, object, omit, string } from "../src/index.js"
import { expectParseSuccess } from "./helpers.js"

const codec = object({ a: number, b: string })

test("should omit the selected properties from an object codec", () => {
  const omitted = omit(codec, ["a"])
  expectParseSuccess(omitted, { b: "" })
})
