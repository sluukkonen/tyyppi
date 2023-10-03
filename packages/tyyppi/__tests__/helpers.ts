import { AnyCodec, array, InputOf, TyyppiError, TypeOf } from "../src/index.js"

export const expectParseSuccess = function <C extends AnyCodec>(
  codec: C,
  value: InputOf<C>,
  result?: TypeOf<C>
) {
  const expected = arguments.length === 3 ? result : value
  const decoded = codec.decodeOrThrow(value)
  const simple = codec.meta.simple

  if (simple) {
    expect(decoded).toBe(expected)
  } else {
    expect(decoded).toEqual(expected)
  }

  const encoded = codec.encode(decoded)
  const roundTripped = codec.decodeOrThrow(encoded)

  if (simple) {
    expect(roundTripped).toBe(expected)
  } else {
    expect(roundTripped).toStrictEqual(expected)
  }

  if (simple) {
    expect(array(codec).decodeOrThrow([value])).toStrictEqual([expected])
  }
}

export const expectParseFailure = <C extends AnyCodec>(
  codec: C,
  value: unknown
) => {
  const result = codec.decode(value)

  expect(result.ok).toBe(false)
  if (!result.ok) {
    expect(result.errors).toMatchSnapshot()
    expect(() => codec.decodeOrThrow(value)).toThrow(
      new TyyppiError(`Found ${result.errors.length} error(s)`, result.errors)
    )
  }
}
