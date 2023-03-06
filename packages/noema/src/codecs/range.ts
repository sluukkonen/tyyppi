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
import { tooLarge, TooLarge, tooSmall, TooSmall } from "../DecodeError.js"
import { failure, Result } from "../Result.js"
import { Ordered } from "../types.js"

interface RangeMetadata<C extends Codec<any, Ordered>> extends Metadata {
  readonly tag: "range"
  readonly simple: IsSimple<C>
  readonly min: TypeOf<C>
  readonly max: TypeOf<C>
  readonly codec: C
}

export type RangeCodec<C extends Codec<any, Ordered>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | TooSmall<TypeOf<C>> | TooLarge<TypeOf<C>>,
  RangeMetadata<C>
>

export const range = <C extends Codec<any, Ordered>>(
  codec: C,
  min: TypeOf<C>,
  max: TypeOf<C>
): RangeCodec<C> =>
  createCodec(
    (
      val
    ): Result<
      TypeOf<C>,
      ErrorOf<C> | TooSmall<TypeOf<C>> | TooLarge<TypeOf<C>>
    > => {
      const result = codec.decode(val) as ResultOf<C>
      return result.ok
        ? result.value < min
          ? failure(tooSmall(min, max))
          : result.value > max
          ? failure(tooLarge(max, min))
          : result
        : result
    },
    codec.encode,
    {
      tag: "range",
      simple: codec.meta.simple,
      codec,
      min,
      max,
    }
  )
