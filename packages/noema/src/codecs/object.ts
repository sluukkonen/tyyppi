import { AnyCodec, Codec, createCodec, InputOf, TypeOf } from "../Codec.js"
import { hasOwnProperty, identity } from "../utils.js"
import { ObjectMetadata } from "../Metadata.js"

type RequiredKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? never : K
}[keyof T]

type OptionalKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? K : never
}[keyof T]

type Id<T> = { [K in keyof T]: T[K] }

type HandleOptionalTypes<T> = Id<
  {
    [K in RequiredKeys<T>]: T[K]
  } & {
    [K in OptionalKeys<T>]?: Exclude<T[K], undefined>
  }
>

type ObjectCodec<T extends Record<string, AnyCodec>> = Codec<
  HandleOptionalTypes<{ [K in keyof T]: InputOf<T[K]> }>,
  HandleOptionalTypes<{ [K in keyof T]: TypeOf<T[K]> }>,
  ObjectMetadata<T>
>

export function object<T extends Record<string, AnyCodec>>(
  props: T
): ObjectCodec<T> {
  const keys = Object.keys(props) as (keyof T & string)[]
  const codecs = Object.values(props)
  const simple = codecs.every((codec) => codec.metadata.simple)

  return createCodec(
    (val, ctx) => {
      if (val == null || typeof val !== "object" || Array.isArray(val))
        return ctx.failure({
          code: "invalid_type",
          path: ctx.path,
        })

      let ok = true
      const object: any = {}
      const path = ctx.path

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const codec = codecs[i]
        ctx.path = path ? `${path}.${key}` : key

        const property = hasOwnProperty(val, key) ? val[key] : undefined

        const result = codec.validate(property, ctx)
        if (!result.ok) ok = false
        else if (ok && result.value !== undefined) object[key] = result.value
      }

      ctx.path = path

      return ok ? ctx.success(object) : ctx.failures()
    },
    simple
      ? identity
      : (object: any) => {
          const result = {} as any

          for (const key in object) {
            if (hasOwnProperty(object, key)) {
              const codec = props[key]
              result[key] = codec.encode(object[key])
            }
          }

          return result
        },
    { tag: "object", simple, props }
  )
}
