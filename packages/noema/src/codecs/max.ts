import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooLarge, TooLarge } from "../DecodeError.js"
import { failure, Result } from "../Result.js"
import { Ordered } from "../types.js"

interface MaxMetadata<C extends Codec<any, Ordered>> {
  readonly tag: "max"
  readonly simple: IsSimple<C>
  readonly max: TypeOf<C>
  readonly codec: C
}

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
      return result.ok
        ? result.value > max
          ? failure(tooLarge(max))
          : result
        : result
    },
    codec.encode,
    { tag: "max", simple: codec.meta.simple, codec, max }
  )
