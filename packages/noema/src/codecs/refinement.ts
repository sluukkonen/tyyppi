import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { DecodeError } from "../DecodeError.js"
import { failure, Result } from "../Result.js"

export interface RefinementCodec<C extends AnyCodec, E extends DecodeError>
  extends Codec<InputOf<C>, TypeOf<C>, ErrorOf<C> | E> {
  readonly metadata: {
    readonly tag: "refinement"
    readonly simple: IsSimple<C>
    readonly codec: C
  }
}

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
