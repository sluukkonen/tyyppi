import { AnyCodec, Codec, InputOf, TypeOf } from "../Codec.js"
import { hasOwnProperty } from "../utils.js"

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

class ObjectCodec<T extends Record<string, AnyCodec>> extends Codec<
  HandleOptionalTypes<{ [K in keyof T]: InputOf<T[K]> }>,
  HandleOptionalTypes<{ [K in keyof T]: TypeOf<T[K]> }>
> {
  constructor(readonly props: T) {
    const keys = Object.keys(props) as (keyof T & string)[]

    super(
      (value, ctx) => {
        if (value == null || typeof value !== "object" || Array.isArray(value))
          return ctx.failure({
            code: "invalid_type",
            path: ctx.path,
          })

        let ok = true
        const object = {} as any
        const path = ctx.path

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          const codec = props[key]
          ctx.setPath(path ? `${path}.${key}` : key)

          const property = hasOwnProperty(value, key) ? value[key] : undefined

          const result = codec.validate(property, ctx)
          if (!result.ok) ok = false
          else if (ok && result.value !== undefined) object[key] = result.value
        }

        ctx.setPath(path)

        return ok ? ctx.success(object) : ctx.failures()
      },
      (object: any) => {
        const result = {} as any

        for (const key in object) {
          if (hasOwnProperty(object, key)) {
            const codec = props[key]
            result[key] = codec.encode(object[key])
          }
        }

        return result
      }
    )
  }
}

export const object = <T extends Record<string, AnyCodec>>(
  props: T
): ObjectCodec<T> => new ObjectCodec(props)
