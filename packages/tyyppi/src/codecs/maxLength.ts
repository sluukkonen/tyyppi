import {
  Codec,
  createCodec,
  InputOf,
  Metadata,
  MetadataOf,
  TypeOf,
} from "../Codec.js"
import { tooLong } from "../errors/index.js"
import { failure } from "../Result.js"
import { HasLength } from "../types.js"

interface MaxLengthMetadata extends Metadata {
  readonly maxLength: number
}

export type MaxLengthCodec<C extends Codec<any, HasLength>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  MetadataOf<C> & MaxLengthMetadata
>

export const maxLength = <C extends Codec<any, HasLength>>(
  codec: C,
  maxLength: number,
): MaxLengthCodec<C> =>
  createCodec(
    (val) => {
      const result = codec.decode(val)
      return result.ok && result.value.length > maxLength
        ? failure(tooLong({ val, length: result.value.length, maxLength }))
        : result
    },
    codec.encode,
    { ...codec.meta, maxLength },
  )
