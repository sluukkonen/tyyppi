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
import { tooSmall, TooSmall } from "../DecodeError.js"
import { failure, Result } from "../Result.js"
import { Ordered } from "../types.js"

interface MinMetadata<C extends Codec<any, Ordered>> extends Metadata {
  readonly tag: "min"
  readonly simple: IsSimple<C>
  readonly min: TypeOf<C>
  readonly codec: C
}

export type MinCodec<C extends Codec<any, Ordered>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | TooSmall<TypeOf<C>>,
  MinMetadata<C>
>

export const min = <C extends Codec<any, Ordered>>(
  codec: C,
  min: TypeOf<C>
): MinCodec<C> =>
  createCodec(
    (val): Result<TypeOf<C>, ErrorOf<C> | TooSmall<TypeOf<C>>> => {
      const result = codec.decode(val) as ResultOf<C>
      return result.ok
        ? result.value < min
          ? failure(tooSmall(result.value, min))
          : result
        : result
    },
    codec.encode,
    { tag: "min", simple: codec.meta.simple, codec, min }
  )
