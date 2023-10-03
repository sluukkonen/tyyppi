import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  MetadataOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooLarge, TooLarge } from "../DecodeError.js"
import { failure } from "../Result.js"
import { Ordered } from "../types.js"

interface MaxMetadata<T extends Ordered> {
  readonly max: T
}

export type MaxCodec<C extends Codec<any, Ordered>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | TooLarge<TypeOf<C>>,
  MetadataOf<C> & MaxMetadata<TypeOf<C>>
>

export const max = <C extends Codec<any, Ordered>>(
  codec: C,
  max: TypeOf<C>
): MaxCodec<C> =>
  createCodec(
    (val) => {
      const result = codec.decode(val) as ResultOf<C>
      return result.ok
        ? result.value > max
          ? failure(tooLarge(result.value, max))
          : result
        : result
    },
    codec.encode,
    { ...codec.meta, max }
  )
