import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  Metadata,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { DecodeError } from "../DecodeError.js"
import { failure } from "../Result.js"

interface RefinementMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "refinement"
  readonly simple: IsSimple<C>
  readonly codec: C
}

export type RefinementCodec<
  C extends AnyCodec,
  E extends DecodeError,
  M extends Metadata = RefinementMetadata<C>
> = Codec<InputOf<C>, TypeOf<C>, ErrorOf<C> | E, M>

export function refinement<
  C extends AnyCodec,
  E extends DecodeError,
  M extends Metadata = RefinementMetadata<C>
>(
  codec: C,
  predicate: (value: TypeOf<C>) => boolean,
  makeError: (value: unknown) => E,
  meta?: M
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
    meta ?? { tag: "refinement", simple: codec.meta.simple, codec }
  ) as RefinementCodec<C, E, M>
}
