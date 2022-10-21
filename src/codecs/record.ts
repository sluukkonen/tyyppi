import {
  AnyCodec,
  AnySimpleCodec,
  Codec,
  InputOf,
  SimpleOf,
  TypeOf,
} from "../Codec.js"
import { hasOwnProperty, identity } from "../utils.js"

class RecordCodec<K extends AnySimpleCodec, V extends AnyCodec> extends Codec<
  Record<InputOf<K>, InputOf<V>>,
  Record<TypeOf<K>, TypeOf<V>>,
  SimpleOf<V>
> {
  constructor(readonly keys: K, readonly values: V) {
    const simple = values.simple
    super(
      (val, ctx) => {
        if (val == null || typeof val !== "object" || Array.isArray(val))
          return ctx.failure({
            code: "invalid_type",
            path: ctx.path,
          })

        const object = {} as any
        let ok = true
        const path = ctx.path

        for (const key in val) {
          if (hasOwnProperty(val, key)) {
            ctx.path = path ? `${path}.${key}` : key

            const keyResult = keys.validate(key, ctx)
            if (!keyResult.ok) ok = false

            const result = values.validate(val[key], ctx)
            if (!result.ok) ok = false
            else if (ok && result.value !== undefined)
              object[key] = result.value
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
      simple
    )
  }
}

export const record = <K extends AnySimpleCodec, V extends AnyCodec>(
  keys: K,
  values: V
) => new RecordCodec(keys, values)
