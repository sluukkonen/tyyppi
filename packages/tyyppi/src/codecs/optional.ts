import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  Metadata,
  MetadataOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { success } from "../Result.js"

interface OptionalMetadata extends Metadata {
  readonly optional: true
}

export type OptionalCodec<C extends AnyCodec> = Codec<
  InputOf<C> | undefined,
  TypeOf<C> | undefined,
  ErrorOf<C>,
  MetadataOf<C> & OptionalMetadata
>

export const optional = <C extends AnyCodec>(codec: C): OptionalCodec<C> =>
  createCodec(
    (val) =>
      val === undefined
        ? success(undefined)
        : (codec.decode(val) as ResultOf<C>),
    (value) => (value === undefined ? value : codec.encode(value)),
    { ...codec.meta, optional: true }
  )
