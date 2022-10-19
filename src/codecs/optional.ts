import { AnyCodec, Codec, InputOf, TypeOf } from "../Codec.js"

class OptionalCodec<C extends AnyCodec> extends Codec<
  InputOf<C> | undefined,
  TypeOf<C> | undefined
> {
  constructor(readonly type: C) {
    super(
      (value, ctx) =>
        value === undefined ? ctx.success(value) : type.validate(value, ctx),
      (value) => (value === undefined ? value : type.encode(value))
    )
  }
}

export const optional = <C extends AnyCodec>(type: C) => new OptionalCodec(type)
