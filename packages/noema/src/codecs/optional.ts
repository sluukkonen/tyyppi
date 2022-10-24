import { AnyCodec, Codec, createCodec, InputOf, TypeOf } from "../Codec.js"
import { OptionalMetadata } from "../Metadata.js"

type OptionalCodec<C extends AnyCodec> = Codec<
  InputOf<C> | undefined,
  TypeOf<C> | undefined,
  OptionalMetadata<C>
>

export function optional<C extends AnyCodec>(codec: C): OptionalCodec<C> {
  return createCodec(
    (val, ctx) =>
      val === undefined ? ctx.success(val) : codec.validate(val, ctx),
    (value) => (value === undefined ? value : codec.encode(value)),
    { tag: "optional", simple: codec.metadata.simple, codec }
  )
}
