import { Codec, Input, Output } from "../Codec.js"

export function hasOwnProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

class ObjectCodec<
  T extends Record<string, Codec<unknown>>,
  I extends Record<string, unknown>,
  O extends Record<string, unknown>
> extends Codec<I, O> {
  constructor(readonly props: T) {
    const keys = Object.keys(props)

    super((value, ctx) => {
      if (value == null || typeof value !== "object" || Array.isArray(value))
        return ctx.failure({
          code: "invalid_object",
          message: "Expected value to be an object",
          value,
        })

      let ok = true
      const object = {} as O
      const path = ctx.path

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const codec = props[key]
        ctx.setPath(path ? `${path}.${key}` : key)

        const property = hasOwnProperty(value, key) ? value[key] : undefined

        const result = codec.validate(property, ctx)
        if (!result.ok) {
          ok = false
        } else if (result.value !== undefined) {
          object[key as keyof O] = result.value as O[keyof O]
        }
      }

      ctx.setPath(path)

      return ok ? ctx.success(object) : ctx.failures()
    })
  }
}

export const object = <T extends Record<string, Codec<unknown>>>(
  props: T
): ObjectCodec<
  T,
  { [K in keyof T]: Input<T[K]> },
  { [K in keyof T]: Output<T[K]> }
> => new ObjectCodec(props)
