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

export interface OptionalCodec<C extends AnyCodec>
  extends Codec<InputOf<C> | undefined, TypeOf<C> | undefined, ErrorOf<C>> {
  readonly metadata: {
    readonly tag: "optional"
    readonly simple: IsSimple<C>
    readonly codec: C
  }
}

export const optional = <C extends AnyCodec>(codec: C): OptionalCodec<C> =>
  createCodec(
    (val) =>
      val === undefined
        ? success(undefined)
        : (codec.decode(val) as ResultOf<C>),
    (value) => (value === undefined ? value : codec.encode(value)),
    { tag: "optional", simple: codec.metadata.simple, codec }
  )
