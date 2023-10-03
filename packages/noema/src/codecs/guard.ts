import {
  AnyCodec,
  Codec,
  ErrorOf,
  InputOf,
  MetadataOf,
  TypeOf,
} from "../Codec.js"
import { DecodeError } from "../DecodeError.js"
import { refinement } from "./refinement.js"

export type GuardCodec<
  C extends AnyCodec,
  T extends TypeOf<C>,
  E extends DecodeError,
  M extends object
> = Codec<InputOf<C>, T, ErrorOf<C> | E, MetadataOf<C> & M>

export const guard: <
  C extends AnyCodec,
  T extends TypeOf<C>,
  E extends DecodeError,
  M extends object
>(
  codec: C,
  guard: (value: TypeOf<C>) => value is T,
  makeError: (value: unknown) => E,
  meta?: M
) => GuardCodec<C, T, E, M> = refinement
