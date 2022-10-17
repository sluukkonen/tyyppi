import { Codec, Input, Output } from "../Codec.js"

class OptionalCodec<C extends Codec<any>> extends Codec<
  Input<C> | undefined,
  Output<C> | undefined
> {
  readonly tag = "optional"
  constructor(readonly type: C) {
    super(
      (value, ctx) =>
        value === undefined ? ctx.success(value) : type.validate(value, ctx),
      (value) => (value === undefined ? value : type.encode(value))
    )
  }
}

export const optional = <C extends Codec<any>>(type: C) =>
  new OptionalCodec(type)
