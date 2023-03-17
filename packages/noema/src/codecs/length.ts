import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  Metadata,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooLong, TooLong, tooShort, TooShort } from "../DecodeError.js"
import { failure, Result } from "../Result.js"
import { HasLength } from "../types.js"
import { hasLength } from "../utils.js"

interface LengthMetadata<C extends Codec<HasLength, any>> extends Metadata {
  readonly tag: "length"
  readonly simple: IsSimple<C>
  readonly length: number
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
  length: number
): LengthCodec<C> =>
  createCodec(
    (val): Result<TypeOf<C>, ErrorOf<C> | TooShort | TooLong> => {
      if (hasLength(val)) {
        if (val.length < length) return failure(tooShort(val, length))
        if (val.length > length) return failure(tooLong(val, length))
      }

      return codec.decode(val) as ResultOf<C>
    },
    codec.encode as (value: TypeOf<C>) => InputOf<C>,
    {
      tag: "length",
      simple: codec.meta.simple,
      codec,
      length,
    }
  )
