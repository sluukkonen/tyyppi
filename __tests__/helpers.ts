import { Codec, ParseError } from "../src/index.js"

export function expectParseSuccess(
  codec: Codec<unknown>,
  value: unknown,
  result?: unknown
) {
  expect(codec.parse(value)).toEqual({ ok: true, value })
  expect(codec.unsafeParse(value)).toEqual(
    arguments.length === 3 ? result : value
  )
}

export function expectParseFailure(codec: Codec<unknown>, value: unknown) {
  const result = codec.parse(value)

  expect(result).toEqual({ ok: false, issues: expect.any(Array) })
  if (!result.ok) {
    expect(result.issues).toMatchSnapshot()

    try {
      codec.unsafeParse(value)
      throw new Error("Bug: unsafeParse didn't throw an error!")
    } catch (err) {
      expect(err).toBeInstanceOf(ParseError)
      if (err instanceof ParseError) {
        expect(err.message).toEqual(result.issues[0].message)
        expect(err.issues).toEqual(result.issues)
      }
    }
  }
}
