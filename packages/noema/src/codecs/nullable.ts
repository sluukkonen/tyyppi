import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { NullableMetadata } from "../Metadata.js"
import { success } from "../Result.js"

type NullableCodec<C extends AnyCodec> = Codec<
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
    { tag: "nullable", simple: codec.metadata.simple, codec }
  )
