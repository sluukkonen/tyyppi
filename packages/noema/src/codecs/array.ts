import { AnyCodec, Codec, createCodec, InputOf, TypeOf } from "../Codec.js"
import { identity } from "../utils.js"
import { ArrayMetadata } from "../Metadata.js"

type ArrayCodec<C extends AnyCodec> = Codec<
  InputOf<C>[],
  TypeOf<C>[],
  ArrayMetadata<C>
>

export function array<C extends AnyCodec>(codec: C): ArrayCodec<C> {
  const simple = codec.meta.simple
  return createCodec(
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

        const result = codec.validate(element, ctx)
        if (!result.ok) ok = false
        else if (!simple && ok) array.push(result.value)
      }

      ctx.path = path

      return ok ? ctx.success(array) : ctx.failures()
    },
    simple ? identity : (array) => array.map((value) => codec.encode(value)),
    { tag: "array", simple, codec }
  )
}
