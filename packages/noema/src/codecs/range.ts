import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooLarge, TooLarge, tooSmall, TooSmall } from "../DecodeError.js"
import { RangeMetadata } from "../Metadata.js"
import { failure, Result } from "../Result.js"
import { Ordered } from "../types.js"

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
      return !result.ok
        ? result
        : result.value < min
        ? failure(tooSmall(min))
        : result.value > max
        ? failure(tooLarge(max))
        : result
    },
    codec.encode,
    {
      tag: "range",
      simple: codec.metadata.simple,
      codec,
      min,
      max,
    }
  )
