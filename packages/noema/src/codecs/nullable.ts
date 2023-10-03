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

interface NullableMetadata extends Metadata {
  readonly nullable: true
}

export type NullableCodec<C extends AnyCodec> = Codec<
  InputOf<C> | null,
  TypeOf<C> | null,
  ErrorOf<C>,
  MetadataOf<C> & NullableMetadata
>

export const nullable = <C extends AnyCodec>(codec: C): NullableCodec<C> =>
  createCodec(
    (val) =>
      val === null ? success(null) : (codec.decode(val) as ResultOf<C>),
    (value) => (value === null ? value : codec.encode(value)),
    { ...codec.meta, nullable: true }
  )
