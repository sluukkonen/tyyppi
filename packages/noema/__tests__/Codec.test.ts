import { createCodec, createSimpleCodec } from "../src/index.js"

describe("codec constructors", () => {
  test("createCodec with two arguments argument assigns default metadata", () => {
    const codec = createCodec(
      (val, ctx) => ctx.success(val),
      (val) => val
    )
    expect(codec.meta).toEqual({ tag: "unknown", simple: false })
  })

  test("createSimpleCodec with one arguments argument assigns default metadata", () => {
    const codec = createSimpleCodec((val, ctx) => ctx.success(val))
    expect(codec.meta).toEqual({ tag: "unknown", simple: true })
  })
})
