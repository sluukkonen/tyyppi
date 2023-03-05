import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { Result, success } from "../Result.js"
import { identity } from "../utils.js"

export interface TransformCodec<C extends AnyCodec, T>
  extends Codec<InputOf<C>, T, ErrorOf<C>> {
  readonly metadata: {
    readonly tag: "transform"
    readonly simple: boolean
    readonly codec: C
  }
}

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
