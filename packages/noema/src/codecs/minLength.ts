import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooShort, TooShort } from "../DecodeError.js"
import { MinLengthMetadata } from "../Metadata.js"
import { failure, Result } from "../Result.js"
import { HasLength } from "../types.js"
import { hasLength } from "../utils.js"

export type MinLengthCodec<C extends Codec<HasLength, any>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | TooShort,
  MinLengthMetadata<C>
>

export const minLength = <C extends Codec<HasLength, any>>(
  codec: C,
  minLength: number
): MinLengthCodec<C> =>
  createCodec(
    (val): Result<TypeOf<C>, ErrorOf<C> | TooShort> => {
      if (hasLength(val)) {
        const length = val.length
        if (length < minLength) return failure(tooShort(minLength, length))
      }
      return codec.decode(val) as ResultOf<C>
    },
    codec.encode as (value: TypeOf<C>) => InputOf<C>,
    { tag: "minLength", simple: codec.metadata.simple, codec, minLength }
  )
