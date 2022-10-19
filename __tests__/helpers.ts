import { AnyCodec, ParseError } from "../src/index.js"

export function expectParseSuccess(
  codec: AnyCodec,
  value: unknown,
  result?: unknown
) {
  expect(codec.decode(value)).toEqual({ ok: true, value })
  const parsed = codec.unsafeDecode(value)
  expect(parsed).toEqual(arguments.length === 3 ? result : value)
  expect(codec.unsafeDecode(codec.encode(parsed))).toEqual(parsed)
}

export function expectParseFailure(codec: AnyCodec, value: unknown) {
  const result = codec.decode(value)

  expect(result).toEqual({ ok: false, issues: expect.any(Array) })
  if (!result.ok) {
    expect(result.issues).toMatchSnapshot()
    expect(() => codec.unsafeDecode(value)).toThrow(
      new ParseError("", result.issues)
    )
  }
}
