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
import { failure, Result } from "../Result.js"

interface RefinementMetadata<C extends AnyCodec> {
  readonly tag: "refinement"
  readonly simple: IsSimple<C>
  readonly codec: C
}

export interface RefinementCodec<
  C extends AnyCodec,
  E extends DecodeError,
  M extends Metadata = RefinementMetadata<C>
> extends Codec<InputOf<C>, TypeOf<C>, ErrorOf<C> | E> {
  readonly metadata: M
}

export function refinement<
  C extends AnyCodec,
  E extends DecodeError,
  M extends Metadata = RefinementMetadata<C>
>(
  codec: C,
  predicate: (value: TypeOf<C>) => boolean,
  makeError: (value: unknown) => E,
  metadata?: M
): RefinementCodec<C, E, M> {
  return createCodec(
    (val): Result<TypeOf<C>, ErrorOf<C> | E> => {
      const result = codec.decode(val) as ResultOf<C>
      return result.ok
        ? predicate(result.value)
          ? result
          : failure(makeError(result.value))
        : result
    },
    codec.encode,
    metadata ?? { tag: "refinement", simple: codec.metadata.simple, codec }
  ) as RefinementCodec<C, E, M>
}
