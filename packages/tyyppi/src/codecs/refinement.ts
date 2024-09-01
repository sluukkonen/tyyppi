import {
  AnyCodec,
  Codec,
  createCodec,
  InputOf,
  MetadataOf,
  TypeOf,
} from "../Codec.js"
import { DecodeError } from "../errors/index.js"
import { failure } from "../Result.js"

export type RefinementCodec<C extends AnyCodec, M extends object> = Codec<
  InputOf<C>,
  TypeOf<C>,
  MetadataOf<C> & M
>

export function refinement<C extends AnyCodec, M extends object>(
  codec: C,
  predicate: (value: TypeOf<C>) => boolean,
  makeError: (value: unknown) => DecodeError,
  meta?: M,
): RefinementCodec<C, M> {
  return createCodec(
    (val) => {
      const result = codec.decode(val)
      return result.ok
        ? predicate(result.value)
          ? result
          : failure(makeError(result.value))
        : result
    },
    codec.encode,
    meta ? { ...codec.meta, ...meta } : codec.meta,
  ) as RefinementCodec<C, M>
}
