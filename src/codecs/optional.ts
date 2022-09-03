import { Codec, Input, Output } from "../Codec.js"

class OptionalCodec<C extends Codec<unknown>> extends Codec<
  Input<C> | undefined,
  Output<C> | undefined
> {
  readonly tag = "optional"
  constructor(readonly type: C) {
    super((value, ctx) =>
      value === undefined ? ctx.success(value) : type.validate(value, ctx)
    )
  }
}

export const optional = <C extends Codec<unknown>>(type: C) =>
  new OptionalCodec(type)
