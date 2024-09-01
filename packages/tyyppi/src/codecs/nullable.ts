import {
  AnyCodec,
  Codec,
  createCodec,
  InputOf,
  Metadata,
  MetadataOf,
  TypeOf,
} from "../Codec.js"
import { success } from "../Result.js"

interface NullableMetadata extends Metadata {
  readonly nullable: true
}

export type NullableCodec<C extends AnyCodec> = Codec<
  InputOf<C> | null,
  TypeOf<C> | null,
  MetadataOf<C> & NullableMetadata
>

export const nullable = <C extends AnyCodec>(codec: C): NullableCodec<C> =>
  createCodec(
    (value) => (value === null ? success(value) : codec.decode(value)),
    (value) => (value === null ? value : codec.encode(value)),
    { ...codec.meta, nullable: true },
  )
