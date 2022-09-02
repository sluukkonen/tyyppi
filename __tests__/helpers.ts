import { Codec, ParseError } from "../src/index.js"

export function expectParseSuccess(codec: Codec<unknown>, value: unknown) {
  expect(codec.parse(value)).toEqual({ ok: true, value })
  expect(codec.unsafeParse(value)).toEqual(value)
}

export function expectParseFailure(codec: Codec<unknown>, value: unknown) {
  const result = codec.parse(value)

  expect(result).toEqual({ ok: false, issues: expect.any(Array) })
  if (!result.ok) expect(result.issues).toMatchSnapshot()
}
