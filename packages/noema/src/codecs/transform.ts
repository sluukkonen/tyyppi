import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { TransformMetadata } from "../Metadata.js"
import { Result, success } from "../Result.js"
import { identity } from "../utils.js"

export type TransformCodec<C extends AnyCodec, T> = Codec<
  InputOf<C>,
  T,
  ErrorOf<C>,
  TransformMetadata<C>
>

export const transform = <C extends AnyCodec, T>(
  codec: C,
  forwards: (value: TypeOf<C>) => T,
  backwards: (value: T) => TypeOf<C>
): TransformCodec<C, T> => {
  const simple = codec.metadata.simple && backwards === identity
  return createCodec(
    (val): Result<T, ErrorOf<C>> => {
      const result = codec.decode(val) as ResultOf<C>
      return result.ok ? success(forwards(result.value)) : result
    },
    simple ? identity : (val) => codec.encode(backwards(val)),
    { tag: "transform", simple, codec }
  )
}
