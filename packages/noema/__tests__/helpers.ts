import { AnyCodec, InputOf, NoemaError, TypeOf } from "../src/index.js"

export const expectParseSuccess = function <C extends AnyCodec>(
  codec: C,
  value: InputOf<C>,
  result?: TypeOf<C>
) {
  const expected = arguments.length === 3 ? result : value
  const decoded = codec.unsafeDecode(value)
  expect(decoded).toEqual(expected)

  const encoded = codec.encode(decoded)
  expect(codec.encode(codec.unsafeDecode(encoded))).toEqual(encoded)
}

export const expectParseFailure = <C extends AnyCodec>(
  codec: C,
  value: unknown
) => {
  const result = codec.decode(value)

  expect(result.ok).toBe(false)
  if (!result.ok) {
    expect(result.errors).toMatchSnapshot()
    expect(() => codec.unsafeDecode(value)).toThrow(
      new NoemaError("", result.errors)
    )
  }
}
