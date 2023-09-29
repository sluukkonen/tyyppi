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
import { tooShort, TooShort } from "../DecodeError.js"
import { failure } from "../Result.js"
import { HasLength } from "../types.js"
import { hasLength } from "../utils.js"

interface MinLengthMetadata<C extends Codec<HasLength, any>> extends Metadata {
  readonly tag: "minLength"
  readonly simple: IsSimple<C>
  readonly minLength: number
  readonly codec: C
}

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
    (val) =>
      hasLength(val) && val.length < minLength
        ? failure(tooShort(val, minLength))
        : (codec.decode(val) as ResultOf<C>),
    codec.encode as (value: TypeOf<C>) => InputOf<C>,
    { tag: "minLength", simple: codec.meta.simple, codec, minLength }
  )
