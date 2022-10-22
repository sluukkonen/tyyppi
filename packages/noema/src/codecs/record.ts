import {
  AnyCodec,
  AnySimpleCodec,
  Codec,
  createCodec,
  InputOf,
  TypeOf,
} from "../Codec.js"
import { hasOwnProperty, identity } from "../utils.js"
import { RecordMetadata } from "../Metadata.js"

type RecordCodec<K extends AnySimpleCodec, V extends AnyCodec> = Codec<
  Record<InputOf<K>, InputOf<V>>,
  Record<TypeOf<K>, TypeOf<V>>,
  RecordMetadata<K, V>
>

export function record<K extends AnySimpleCodec, V extends AnyCodec>(
  keys: K,
  values: V
): RecordCodec<K, V> {
  const simple = values.meta.simple
  return createCodec(
    (val, ctx) => {
      if (val == null || typeof val !== "object" || Array.isArray(val))
        return ctx.failure({
          code: "invalid_type",
          path: ctx.path,
        })

      const object: any = simple ? val : {}
      let ok = true
      const path = ctx.path

      for (const key in val) {
        if (hasOwnProperty(val, key)) {
          ctx.path = path ? `${path}.${key}` : key

          const keyResult = keys.validate(key, ctx)
          if (!keyResult.ok) ok = false

          const result = values.validate(val[key], ctx)
          if (!result.ok) ok = false
          else if (!simple && ok && result.value !== undefined) object[key] = result.value
        }
      }

      ctx.path = path

      return ok ? ctx.success(object) : ctx.failures()
    },
    simple
      ? identity
      : (record: any) => {
          const result = {} as any

          for (const key in record) {
            if (hasOwnProperty(record, key)) {
              result[key] = values.encode(record[key])
            }
          }

          return result
        },
    { tag: "record", simple, keys, values }
  )
}
