import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooLong, TooLong } from "../DecodeError.js"
import { MaxLengthMetadata } from "../Metadata.js"
import { failure, Result } from "../Result.js"
import { HasLength } from "../types.js"
import { hasLength } from "../utils.js"

type MaxLengthCodec<C extends Codec<HasLength, any>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | TooLong,
  MaxLengthMetadata<C>
>

export const maxLength = <C extends Codec<HasLength, any>>(
  codec: C,
  maxLength: number
): MaxLengthCodec<C> =>
  createCodec(
    (val): Result<TypeOf<C>, ErrorOf<C> | TooLong> => {
      if (hasLength(val)) {
        const length = val.length
        if (length > maxLength) return failure(tooLong(maxLength, length))
      }
      return codec.decode(val) as ResultOf<C>
    },
    codec.encode as (value: TypeOf<C>) => InputOf<C>,
    { tag: "maxLength", simple: codec.metadata.simple, codec, maxLength }
  )
