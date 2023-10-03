import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  MetadataOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { DecodeError } from "../DecodeError.js"
import { failure } from "../Result.js"

export type RefinementCodec<
  C extends AnyCodec,
  E extends DecodeError,
  M extends object,
> = Codec<InputOf<C>, TypeOf<C>, ErrorOf<C> | E, MetadataOf<C> & M>

export function refinement<
  C extends AnyCodec,
  E extends DecodeError,
  M extends object,
>(
  codec: C,
  predicate: (value: TypeOf<C>) => boolean,
  makeError: (value: unknown) => E,
  meta?: M,
): RefinementCodec<C, E, M> {
  return createCodec(
    (val) => {
      const result = codec.decode(val) as ResultOf<C>
      return result.ok
        ? predicate(result.value)
          ? result
          : failure(makeError(result.value))
        : result
    },
    codec.encode,
    meta ? { ...codec.meta, ...meta } : codec.meta,
  ) as RefinementCodec<C, E, M>
}
