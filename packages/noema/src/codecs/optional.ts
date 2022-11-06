import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { OptionalMetadata } from "../Metadata.js"
import { success } from "../Result.js"

type OptionalCodec<C extends AnyCodec> = Codec<
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
    { tag: "optional", simple: codec.metadata.simple, codec }
  )
