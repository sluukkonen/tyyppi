import {
  AnyCodec,
  Codec,
  createCodec,
  InputOf,
  Metadata,
  TypeOf,
} from "../Codec.js"
import { success } from "../Result.js"

interface TransformMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "transform"
  readonly simple: false
  readonly codec: C
}

export type TransformCodec<C extends AnyCodec, T> = Codec<
  InputOf<C>,
  T,
  TransformMetadata<C>
>

export const transform = <C extends AnyCodec, T>(
  codec: C,
  forwards: (value: TypeOf<C>) => T,
  backwards: (value: T) => TypeOf<C>,
): TransformCodec<C, T> => {
  return createCodec(
    (val) => {
      const result = codec.decode(val)
      return result.ok ? success(forwards(result.value)) : result
    },
    (val) => codec.encode(backwards(val)),
    { tag: "transform", simple: false, codec },
  )
}
