import { Codec, createCodec, InputOf, MetadataOf, TypeOf } from "../Codec.js"
import { tooLarge } from "../errors/index.js"
import { failure } from "../Result.js"
import { Ordered } from "../types.js"

interface MaxMetadata<T extends Ordered> {
  readonly max: T
}

export type MaxCodec<C extends Codec<any, Ordered>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  MetadataOf<C> & MaxMetadata<TypeOf<C>>
>

export const max = <C extends Codec<any, Ordered>>(
  codec: C,
  max: TypeOf<C>,
): MaxCodec<C> =>
  createCodec(
    (val) => {
      const result = codec.decode(val)
      return result.ok && result.value > max
        ? failure(tooLarge({ val: result.value, max }))
        : result
    },
    codec.encode,
    { ...codec.meta, max },
  )
