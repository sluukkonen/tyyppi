import { AnyCodec, Codec, InputOf, SimpleOf, TypeOf } from "../Codec.js"

class OptionalCodec<C extends AnyCodec> extends Codec<
  InputOf<C> | undefined,
  TypeOf<C> | undefined,
  SimpleOf<C>
> {
  constructor(readonly type: C) {
    super(
      (value, ctx) =>
        value === undefined ? ctx.success(value) : type.validate(value, ctx),
      (value) => (value === undefined ? value : type.encode(value)),
      type.simple
    )
  }
}

export const optional = <C extends AnyCodec>(type: C) => new OptionalCodec(type)
