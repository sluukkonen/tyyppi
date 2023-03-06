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

interface NullableMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "nullable"
  readonly simple: IsSimple<C>
  readonly codec: C
}

export type NullableCodec<C extends AnyCodec> = Codec<
  InputOf<C> | null,
  TypeOf<C> | null,
  ErrorOf<C>,
  NullableMetadata<C>
>

export const nullable = <C extends AnyCodec>(codec: C): NullableCodec<C> =>
  createCodec(
    (val) =>
      val === null ? success(null) : (codec.decode(val) as ResultOf<C>),
    (value) => (value === null ? value : codec.encode(value)),
    { tag: "nullable", simple: codec.meta.simple, codec }
  )
