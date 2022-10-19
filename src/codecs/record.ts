import { AnyCodec, Codec, InputOf, TypeOf } from "../Codec.js"
import { hasOwnProperty } from "../utils.js"

class RecordCodec<V extends AnyCodec> extends Codec<
  Record<string, InputOf<V>>,
  Record<string, TypeOf<V>>
> {
  constructor(readonly values: V) {
    super(
      (record, ctx) => {
        if (
          record == null ||
          typeof record !== "object" ||
          Array.isArray(record)
        )
          return ctx.failure({
            code: "invalid_type",
            message: "Expected value to be an object",
            path: ctx.path,
            value: record,
          })

        const object = {} as Record<string, TypeOf<V>>
        let ok = true
        const path = ctx.path

        for (const k in record) {
          if (hasOwnProperty(record, k)) {
            ctx.setPath(path ? `${path}.${k}` : k)

            const result = values.validate(record[k], ctx)
            if (!result.ok) ok = false
            else if (ok && result.value !== undefined) object[k] = result.value
          }
        }

        ctx.setPath(path)

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

export const record = <V extends AnyCodec>(values: V) => new RecordCodec(values)
