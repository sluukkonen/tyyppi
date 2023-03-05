import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooLarge, TooLarge, tooSmall, TooSmall } from "../DecodeError.js"
import { failure, Result } from "../Result.js"
import { Ordered } from "../types.js"

export interface RangeCodec<C extends Codec<any, Ordered>>
  extends Codec<
    InputOf<C>,
    TypeOf<C>,
    ErrorOf<C> | TooSmall<TypeOf<C>> | TooLarge<TypeOf<C>>
  > {
  readonly metadata: {
    readonly tag: "range"
    readonly simple: IsSimple<C>
    readonly min: TypeOf<C>
    readonly max: TypeOf<C>
    readonly codec: C
  }
}

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
          ? failure(tooSmall(min))
          : result.value > max
          ? failure(tooLarge(max))
          : result
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
