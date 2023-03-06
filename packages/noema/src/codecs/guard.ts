import {
  AnyCodec,
  Codec,
  ErrorOf,
  InputOf,
  IsSimple,
  Metadata,
  TypeOf,
} from "../Codec.js"
import { DecodeError } from "../DecodeError.js"
import { refinement } from "./refinement.js"

interface GuardMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "refinement"
  readonly simple: IsSimple<C>
  readonly codec: C
}

export type GuardCodec<
  C extends AnyCodec,
  T extends TypeOf<C>,
  E extends DecodeError
> = Codec<InputOf<C>, T, ErrorOf<C> | E, GuardMetadata<C>>

export const guard: <
  C extends AnyCodec,
  T extends TypeOf<C>,
  E extends DecodeError
>(
  codec: C,
  guard: (value: TypeOf<C>) => value is T,
  makeError: (value: unknown) => E
) => GuardCodec<C, T, E> = refinement
