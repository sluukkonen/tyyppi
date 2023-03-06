import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooLong, TooLong, tooShort, TooShort } from "../DecodeError.js"
import { failure, Result } from "../Result.js"
import { HasLength } from "../types.js"
import { hasLength } from "../utils.js"

interface LengthMetadata<C extends Codec<HasLength, any>> {
  readonly tag: "length"
  readonly simple: IsSimple<C>
  readonly minLength: number
  readonly maxLength: number
  readonly codec: C
}

export type LengthCodec<C extends Codec<HasLength, any>> = Codec<
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
        if (length < minLength)
          return failure(tooShort(length, minLength, maxLength))
        if (length > maxLength)
          return failure(tooLong(length, maxLength, minLength))
      }

      return codec.decode(val) as ResultOf<C>
    },
    codec.encode as (value: TypeOf<C>) => InputOf<C>,
    {
      tag: "length",
      simple: codec.meta.simple,
      codec,
      minLength,
      maxLength,
    }
  )
