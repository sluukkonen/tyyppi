import { AnyCodec, ParseError } from "../src/index.js"

export function expectParseSuccess(
  codec: AnyCodec,
  value: unknown,
  result?: unknown
) {
  expect(codec.parse(value)).toEqual({ ok: true, value })
  const parsed = codec.unsafeParse(value)
  expect(parsed).toEqual(arguments.length === 3 ? result : value)
  expect(codec.unsafeParse(codec.encode(parsed))).toEqual(parsed)
}

export function expectParseFailure(codec: AnyCodec, value: unknown) {
  const result = codec.parse(value)

  expect(result).toEqual({ ok: false, issues: expect.any(Array) })
  if (!result.ok) {
    expect(result.issues).toMatchSnapshot()
    expect(() => codec.unsafeParse(value)).toThrow(
      new ParseError(result.issues[0].message, result.issues)
    )
  }
}
