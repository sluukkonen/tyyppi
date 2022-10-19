import { AnyCodec, Codec, InputOf, TypeOf } from "../Codec.js"
import { hasOwnProperty } from "../utils.js"

class ObjectCodec<T extends Record<string, AnyCodec>> extends Codec<
  { [K in keyof T]: InputOf<T[K]> },
  { [K in keyof T]: TypeOf<T[K]> }
> {
  constructor(readonly props: T) {
    const keys = Object.keys(props) as (keyof T & string)[]

    super(
      (value, ctx) => {
        if (value == null || typeof value !== "object" || Array.isArray(value))
          return ctx.failure({
            code: "invalid_type",
            message: "Expected value to be an object",
            path: ctx.path,
            value,
          })

        let ok = true
        const object = {} as { [K in keyof T]: TypeOf<T[K]> }
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
      (object) => {
        const result = {} as { [K in keyof T]: InputOf<T[K]> }

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
