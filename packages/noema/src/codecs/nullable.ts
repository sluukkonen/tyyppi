import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { success } from "../Result.js"

export interface NullableCodec<C extends AnyCodec>
  extends Codec<InputOf<C> | null, TypeOf<C> | null, ErrorOf<C>> {
  readonly metadata: {
    readonly tag: "nullable"
    readonly simple: IsSimple<C>
    readonly codec: C
  }
}

export const nullable = <C extends AnyCodec>(codec: C): NullableCodec<C> =>
  createCodec(
    (val) =>
      val === null ? success(null) : (codec.decode(val) as ResultOf<C>),
    (value) => (value === null ? value : codec.encode(value)),
    { tag: "nullable", simple: codec.metadata.simple, codec }
  )
