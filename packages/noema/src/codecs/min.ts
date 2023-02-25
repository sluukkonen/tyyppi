import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooSmall, TooSmall } from "../DecodeError.js"
import { MinMetadata } from "../Metadata.js"
import { failure, Result } from "../Result.js"
import { Ordered } from "../types.js"

type MinCodec<C extends Codec<any, Ordered>> = Codec<
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
      return !result.ok
        ? result
        : result.value < min
        ? failure(tooSmall(min))
        : result
    },
    codec.encode,
    { tag: "min", simple: codec.metadata.simple, codec, min }
  )
