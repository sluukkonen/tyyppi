import { Codec, Input, Output } from "../Codec.js"

class ArrayCodec<C extends Codec<I, O>, I, O> extends Codec<I[], O[]> {
  readonly tag = "array"

  constructor(readonly values: C) {
    super((value, ctx) => {
      if (!Array.isArray(value))
        return ctx.failure({
          code: "invalid_type",
          message: "Expected value to be an array",
          value,
        })

      let ok = true
      const array: Output<C>[] = []
      const path = ctx.path

      for (let i = 0; i < value.length; i++) {
        ctx.setPath(path ? `${path}[${i}]` : String(i))
        const element = value[i]
        const result = values.validate(element, ctx)
        if (!result.ok) ok = false
        else array.push(result.value)
      }

      return ok ? ctx.success(array) : ctx.failures()
    })
  }
}

export const array = <C extends Codec<unknown>>(
  codec: C
): ArrayCodec<C, Input<C>, Output<C>> => new ArrayCodec(codec)
