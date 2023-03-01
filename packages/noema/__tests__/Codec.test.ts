import { createCodec, createSimpleCodec, success } from "../src/index.js"

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
