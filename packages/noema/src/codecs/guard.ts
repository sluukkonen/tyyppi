import {
  AnyCodec,
  Codec,
  ErrorOf,
  InputOf,
  IsSimple,
  TypeOf,
} from "../Codec.js"
import { DecodeError } from "../DecodeError.js"
import { refinement } from "./refinement.js"

export interface GuardCodec<
  C extends AnyCodec,
  T extends TypeOf<C>,
  E extends DecodeError
> extends Codec<InputOf<C>, T, ErrorOf<C> | E> {
  readonly metadata: {
    readonly tag: "refinement"
    readonly simple: IsSimple<C>
    readonly codec: C
  }
}

export const guard: <
  C extends AnyCodec,
  T extends TypeOf<C>,
  E extends DecodeError
>(
  codec: C,
  guard: (value: TypeOf<C>) => value is T,
  makeError: (value: unknown) => E
) => GuardCodec<C, T, E> = refinement
