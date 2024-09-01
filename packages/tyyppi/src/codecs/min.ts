import {
  Codec,
  createCodec,
  InputOf,
  Metadata,
  MetadataOf,
  TypeOf,
} from "../Codec.js"
import { tooSmall } from "../errors/index.js"
import { failure } from "../Result.js"
import { Ordered } from "../types.js"

interface MinMetadata<T extends Ordered> extends Metadata {
  readonly min: T
}

export type MinCodec<C extends Codec<any, Ordered>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  MetadataOf<C> & MinMetadata<TypeOf<C>>
>

export const min = <C extends Codec<any, Ordered>>(
  codec: C,
  min: TypeOf<C>,
): MinCodec<C> =>
  createCodec(
    (val) => {
      const result = codec.decode(val)
      return result.ok && result.value < min
        ? failure(tooSmall({ val: result.value, min }))
        : result
    },
    codec.encode,
    { ...codec.meta, min },
  )
