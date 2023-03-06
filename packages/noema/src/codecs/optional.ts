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
import { success } from "../Result.js"

export interface OptionalMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "optional"
  readonly simple: IsSimple<C>
  readonly codec: C
}

export type OptionalCodec<C extends AnyCodec> = Codec<
  InputOf<C> | undefined,
  TypeOf<C> | undefined,
  ErrorOf<C>,
  OptionalMetadata<C>
>

export const optional = <C extends AnyCodec>(codec: C): OptionalCodec<C> =>
  createCodec(
    (val) =>
      val === undefined
        ? success(undefined)
        : (codec.decode(val) as ResultOf<C>),
    (value) => (value === undefined ? value : codec.encode(value)),
    { tag: "optional", simple: codec.meta.simple, codec }
  )
