import { AnyCodec, InputOf, ParseError, TypeOf } from "../src/index.js"

export function expectParseSuccess<C extends AnyCodec>(
  codec: C,
  value: InputOf<C>,
  result?: TypeOf<C>
) {
  const expected = arguments.length === 3 ? result : value
  expect(codec.decode(value)).toEqual({ ok: true, value: expected })
  const decoded = codec.unsafeDecode(value)
  expect(decoded).toEqual(expected)
  expect(codec.unsafeDecode(codec.encode(decoded))).toEqual(decoded)
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
