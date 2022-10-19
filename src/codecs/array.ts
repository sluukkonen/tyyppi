import { AnyCodec, Codec, InputOf, TypeOf } from "../Codec.js"

class ArrayCodec<C extends AnyCodec> extends Codec<InputOf<C>[], TypeOf<C>[]> {
  constructor(readonly values: C) {
    super(
      (value, ctx) => {
        if (!Array.isArray(value))
          return ctx.failure({
            code: "invalid_type",
            message: "Expected value to be an array",
            path: ctx.path,
            value,
          })

        let ok = true
        const array: TypeOf<C>[] = []
        const path = ctx.path

        for (let i = 0; i < value.length; i++) {
          ctx.setPath(path ? `${path}[${i}]` : String(i))
          const element = value[i]

          const result = values.validate(element, ctx)
          if (!result.ok) ok = false
          else if (ok) array.push(result.value)
        }

        ctx.setPath(path)

        return ok ? ctx.success(array) : ctx.failures()
      },
      (array) => array.map((value) => values.encode(value))
    )
  }
}

export const array = <C extends AnyCodec>(codec: C): ArrayCodec<C> =>
  new ArrayCodec(codec)
