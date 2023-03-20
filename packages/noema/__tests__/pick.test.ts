import { number, object, pick, string } from "../src/index.js"
import { expectParseSuccess } from "./helpers.js"

const codec = object({ a: number, b: string })

test("should pick the selected properties from an object codec", () => {
  const picked = pick(codec, ["a"])
  expectParseSuccess(picked, { a: 0 })
})
