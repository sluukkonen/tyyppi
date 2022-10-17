import { AnyCodec, Codec, InputOf, TypeOf } from "../Codec.js"
import { Success } from "../Result.js"
import { hasOwnProperty } from "../utils.js"

class RecordCodec<K extends Codec<string>, V extends AnyCodec> extends Codec<
  Record<InputOf<K>, InputOf<V>>,
  Record<TypeOf<K>, TypeOf<V>>
> {
  readonly tag = "record"

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
            message: "Expected value to be an object",
            value: record,
          })

        const result = {} as Record<TypeOf<K>, TypeOf<V>>
        let ok = true
        const path = ctx.path

        for (const k in record) {
          if (hasOwnProperty(record, k)) {
            ctx.setPath(path ? `${path}.${k}` : k)

            const keyResult = keys.validate(k, ctx)
            if (!keyResult.ok) ok = false

            const valueResult = values.validate(record[k], ctx)
            if (!valueResult.ok) ok = false
            else if (ok && valueResult.value !== undefined) {
              result[(keyResult as Success<TypeOf<K>>).value] =
                valueResult.value
            }
          }
        }

        ctx.setPath(path)

        return ok ? ctx.success(result) : ctx.failures()
      },
      (record) => {
        const result = {} as Record<InputOf<K>, InputOf<V>>

        for (const key in record) {
          if (hasOwnProperty(record, key)) {
            result[key as InputOf<K>] = values.encode(record[key as InputOf<K>])
          }
        }

        return result
      }
    )
  }
}

export const record = <K extends Codec<string>, V extends AnyCodec>(
  keys: K,
  values: V
) => new RecordCodec(keys, values)
