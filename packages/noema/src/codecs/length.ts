import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooLong, TooLong, tooShort, TooShort } from "../DecodeError.js"
import { LengthMetadata } from "../Metadata.js"
import { failure, Result } from "../Result.js"
import { HasLength } from "../types.js"
import { hasLength } from "../utils.js"

type LengthCodec<C extends Codec<HasLength, any>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | TooShort | TooLong,
  LengthMetadata<C>
>

export const length = <C extends Codec<HasLength, any>>(
  codec: C,
  minLength: number,
  maxLength: number
): LengthCodec<C> =>
  createCodec(
    (val): Result<TypeOf<C>, ErrorOf<C> | TooShort | TooLong> => {
      if (hasLength(val)) {
        const length = val.length
        if (length < minLength) return failure(tooShort(minLength, length))
        if (length > maxLength) return failure(tooLong(maxLength, length))
      }

      return codec.decode(val) as ResultOf<C>
    },
    codec.encode as (value: TypeOf<C>) => InputOf<C>,
    {
      tag: "length",
      simple: codec.metadata.simple,
      codec,
      minLength,
      maxLength,
    }
  )
