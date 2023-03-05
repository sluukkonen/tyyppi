import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooShort, TooShort } from "../DecodeError.js"
import { failure, Result } from "../Result.js"
import { HasLength } from "../types.js"
import { hasLength } from "../utils.js"

export interface MinLengthCodec<C extends Codec<HasLength, any>>
  extends Codec<InputOf<C>, TypeOf<C>, ErrorOf<C> | TooShort> {
  readonly metadata: {
    readonly tag: "minLength"
    readonly simple: IsSimple<C>
    readonly minLength: number
    readonly codec: C
  }
}

export const minLength = <C extends Codec<HasLength, any>>(
  codec: C,
  minLength: number
): MinLengthCodec<C> =>
  createCodec(
    (val): Result<TypeOf<C>, ErrorOf<C> | TooShort> => {
      if (hasLength(val)) {
        const length = val.length
        if (length < minLength) return failure(tooShort(length, minLength))
      }
      return codec.decode(val) as ResultOf<C>
    },
    codec.encode as (value: TypeOf<C>) => InputOf<C>,
    { tag: "minLength", simple: codec.metadata.simple, codec, minLength }
  )
