import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  Metadata,
  MetadataOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooSmall, TooSmall } from "../DecodeError.js"
import { failure } from "../Result.js"
import { Ordered } from "../types.js"

interface MinMetadata<T extends Ordered> extends Metadata {
  readonly min: T
}

export type MinCodec<C extends Codec<any, Ordered>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | TooSmall<TypeOf<C>>,
  MetadataOf<C> & MinMetadata<TypeOf<C>>
>

export const min = <C extends Codec<any, Ordered>>(
  codec: C,
  min: TypeOf<C>
): MinCodec<C> =>
  createCodec(
    (val) => {
      const result = codec.decode(val) as ResultOf<C>
      return result.ok
        ? result.value < min
          ? failure(tooSmall(result.value, min))
          : result
        : result
    },
    codec.encode,
    { ...codec.meta, min }
  )
