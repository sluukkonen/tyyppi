import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooLarge, TooLarge } from "../DecodeError.js"
import { MaxMetadata } from "../Metadata.js"
import { failure, Result } from "../Result.js"
import { Ordered } from "../types.js"

export type MaxCodec<C extends Codec<any, Ordered>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | TooLarge<TypeOf<C>>,
  MaxMetadata<C>
>

export const max = <C extends Codec<any, Ordered>>(
  codec: C,
  max: TypeOf<C>
): MaxCodec<C> =>
  createCodec(
    (val): Result<TypeOf<C>, ErrorOf<C> | TooLarge<TypeOf<C>>> => {
      const result = codec.decode(val) as ResultOf<C>
      return !result.ok
        ? result
        : result.value > max
        ? failure(tooLarge(max))
        : result
    },
    codec.encode,
    { tag: "max", simple: codec.metadata.simple, codec, max }
  )
