import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { DecodeError } from "../DecodeError.js"
import { RefinementMetadata } from "../Metadata.js"
import { failure, Result } from "../Result.js"

export type RefinementCodec<C extends AnyCodec, E extends DecodeError> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | E,
  RefinementMetadata<C>
>

export function refinement<C extends AnyCodec, E extends DecodeError>(
  codec: C,
  predicate: (value: TypeOf<C>) => boolean,
  makeError: (value: unknown) => E
): RefinementCodec<C, E> {
  return createCodec(
    (val): Result<TypeOf<C>, ErrorOf<C> | E> => {
      const result = codec.decode(val) as ResultOf<C>
      return !result.ok
        ? result
        : predicate(result.value)
        ? result
        : failure(makeError(result.value))
    },
    codec.encode,
    { tag: "refinement", simple: codec.metadata.simple, codec }
  )
}
