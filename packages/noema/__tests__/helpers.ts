import { AnyCodec, InputOf, ParseError, TypeOf } from "../src/index.js"

export function expectParseSuccess<C extends AnyCodec>(
  codec: C,
  value: InputOf<C>,
  result?: TypeOf<C>
) {
  const expected = arguments.length === 3 ? result : value
  const decoded = codec.unsafeDecode(value)
  expect(decoded).toEqual(expected)
  expect(codec.encode(decoded)).toEqual(value)
}

export function expectParseFailure(codec: AnyCodec, value: unknown) {
  const result = codec.decode(value)

  if (!result.ok) {
    expect(result.errors).toMatchSnapshot()
    expect(() => codec.unsafeDecode(value)).toThrow(
      new ParseError("", result.errors)
    )
  }
}
