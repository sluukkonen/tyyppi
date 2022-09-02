import { Codec, ParseError } from "../src/index.js"

describe("Codec#parse", () => {
  test("should return a success object when parse succeeds", () => {
    const codec = new Codec<unknown>((value, ctx) => ctx.success(value))

    expect(codec.parse("")).toEqual({ ok: true, value: "" })
  })

  test("should return a failure object when parse fails", () => {
    const codec = new Codec<unknown>((value, ctx) =>
      ctx.failure({
        code: "generic_issue",
        message: "",
        value,
      })
    )

    expect(codec.parse("")).toEqual({
      ok: false,
      issues: [
        {
          code: "generic_issue",
          message: "",
          value: "",
          path: "",
        },
      ],
    })
  })
})

describe("Codec#unsafeParse", () => {
  test("should return the parsed value when parse succeeds", () => {
    const codec = new Codec((value, ctx) => ctx.success(value))

    expect(codec.unsafeParse(0)).toBe(0)
  })

  test("should throw a ParseError when parse fails", () => {
    const codec = new Codec((value, ctx) =>
      ctx.failure({
        code: "generic_issue",
        message: "foo bar",
        value,
      })
    )

    expect(() => codec.unsafeParse(0)).toThrowError(ParseError)
  })
})
