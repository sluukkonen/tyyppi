import { AnyCodec, Codec, InputOf, TypeOf } from "../Codec.js"
import { hasOwnProperty } from "../utils.js"
import { AnySimpleCodec } from "../SimpleCodec.js"

class RecordCodec<K extends AnyCodec, V extends AnyCodec> extends Codec<
  Record<string, InputOf<V>>,
  Record<string, TypeOf<V>>
> {
  constructor(readonly keys: K, readonly values: V) {
    super(
      (record, ctx) => {
        if (
          record == null ||
          typeof record !== "object" ||
          Array.isArray(record)
        )
          return ctx.failure({
            code: "invalid_type",
            path: ctx.path,
          })

        const object = {} as Record<string, TypeOf<V>>
        let ok = true
        const path = ctx.path

        for (const k in record) {
          if (hasOwnProperty(record, k)) {
            ctx.path = path ? `${path}.${k}` : k

            const keyResult = keys.validate(k, ctx)
            if (!keyResult.ok) ok = false

            const result = values.validate(record[k], ctx)
            if (!result.ok) ok = false
            else if (ok && result.value !== undefined) object[k] = result.value
          }
        }

        ctx.path = path

        return ok ? ctx.success(object) : ctx.failures()
      },
      (record) => {
        const result = {} as Record<string, InputOf<V>>

        for (const key in record) {
          if (hasOwnProperty(record, key)) {
            result[key] = values.encode(record[key])
          }
        }

        return result
      }
    )
  }
}

export const record = <K extends AnySimpleCodec, V extends AnyCodec>(
  keys: K,
  values: V
) => new RecordCodec(keys, values)
