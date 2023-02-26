import { AnyCodec, Codec, ErrorOf, InputOf, TypeOf } from "../Codec.js"
import { DecodeError } from "../DecodeError.js"
import { RefinementMetadata } from "../Metadata.js"
import { refinement } from "./refinement.js"

export type GuardCodec<
  C extends AnyCodec,
  T extends TypeOf<C>,
  E extends DecodeError
> = Codec<InputOf<C>, T, ErrorOf<C> | E, RefinementMetadata<C>>

export const guard: <
  C extends AnyCodec,
  T extends TypeOf<C>,
  E extends DecodeError
>(
  codec: C,
  guard: (value: TypeOf<C>) => value is T,
  makeError: (value: unknown) => E
) => GuardCodec<C, T, E> = refinement
