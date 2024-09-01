import { AnyCodec, Codec, InputOf, MetadataOf, TypeOf } from "../Codec.js"
import { DecodeError } from "../errors/index.js"
import { refinement } from "./refinement.js"

export type GuardCodec<
  C extends AnyCodec,
  T extends TypeOf<C>,
  M extends object,
> = Codec<InputOf<C>, T, MetadataOf<C> & M>

export const guard: <C extends AnyCodec, T extends TypeOf<C>, M extends object>(
  codec: C,
  guard: (value: TypeOf<C>) => value is T,
  makeError: (value: unknown) => DecodeError,
  meta?: M,
) => GuardCodec<C, T, M> = refinement
