import { Codec, createCodec, InputOf, MetadataOf, TypeOf } from "../Codec.js"
import { tooShort } from "../errors/index.js"
import { failure } from "../Result.js"
import { HasLength } from "../types.js"

interface MinLengthMetadata {
  readonly minLength: number
}

export type MinLengthCodec<C extends Codec<HasLength, any>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  MetadataOf<C> & MinLengthMetadata
>

export const minLength = <C extends Codec<any, HasLength>>(
  codec: C,
  minLength: number,
): MinLengthCodec<C> =>
  createCodec(
    (val) => {
      const result = codec.decode(val)
      return result.ok && result.value.length < minLength
        ? failure(tooShort({ val, length: result.value.length, minLength }))
        : result
    },
    codec.encode,
    { ...codec.meta, minLength },
  )
