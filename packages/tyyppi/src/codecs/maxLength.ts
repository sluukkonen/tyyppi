import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  Metadata,
  MetadataOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooLong, TooLong } from "../DecodeError.js"
import { failure } from "../Result.js"
import { HasLength } from "../types.js"
import { hasLength } from "../utils.js"

interface MaxLengthMetadata extends Metadata {
  readonly maxLength: number
}

export type MaxLengthCodec<C extends Codec<HasLength, any>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | TooLong,
  MetadataOf<C> & MaxLengthMetadata
>

export const maxLength = <C extends Codec<HasLength, any>>(
  codec: C,
  maxLength: number
): MaxLengthCodec<C> =>
  createCodec(
    (val) =>
      hasLength(val) && val.length > maxLength
        ? failure(tooLong(val, maxLength))
        : (codec.decode(val) as ResultOf<C>),
    codec.encode as (value: TypeOf<C>) => InputOf<C>,
    { ...codec.meta, maxLength }
  )
