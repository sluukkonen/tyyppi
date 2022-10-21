import { AnyCodec, Codec, InputOf, SimpleOf, TypeOf } from "../Codec.js"
import { identity } from "../utils.js"

class ArrayCodec<C extends AnyCodec> extends Codec<
  InputOf<C>[],
  TypeOf<C>[],
  SimpleOf<C>
> {
  constructor(readonly values: C) {
    const simple = values.simple
    super(
      (val, ctx) => {
        if (!Array.isArray(val))
          return ctx.failure({
            code: "invalid_type",
            path: ctx.path,
          })

        let ok = true
        const array: TypeOf<C>[] = simple ? val : []
        const path = ctx.path

        for (let i = 0; i < val.length; i++) {
          ctx.path = path ? `${path}[${i}]` : String(i)
          const element = val[i]

          const result = values.validate(element, ctx)
          if (!result.ok) ok = false
          else if (!simple && ok) array.push(result.value)
        }

        ctx.path = path

        return ok ? ctx.success(array) : ctx.failures()
      },
      simple ? identity : (array) => array.map((value) => values.encode(value)),
      simple
    )
  }
}

export const array = <C extends AnyCodec>(codec: C): ArrayCodec<C> =>
  new ArrayCodec(codec)
