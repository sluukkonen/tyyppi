import { Codec, Input, Output } from "../Codec.js"
import { Success } from "../Result.js"
import { hasOwnProperty } from "./object.js"

class RecordCodec<
  K extends Codec<string>,
  V extends Codec<unknown>
> extends Codec<Record<Input<K>, Input<V>>, Record<Output<K>, Output<V>>> {
  readonly tag = "record"

  constructor(readonly keys: K, readonly values: V) {
    super((record, ctx) => {
      if (record == null || typeof record !== "object" || Array.isArray(record))
        return ctx.failure({
          code: "invalid_type",
          message: "Expected value to be an object",
          value: record,
        })

      const result = {} as Record<Output<K>, Output<V>>
      let ok = true
      const path = ctx.path

      for (const k in record) {
        if (hasOwnProperty(record, k)) {
          ctx.setPath(path ? `${path}.${k}` : k)
          const keyResult = keys.validate(k, ctx)
          if (!keyResult.ok) ok = false

          const valueResult = values.validate(record[k], ctx)
          if (!valueResult.ok) ok = false

          if (ok) {
            result[(keyResult as Success<Output<K>>).value] = (
              valueResult as Success<Output<V>>
            ).value
          }
        }
      }

      ctx.setPath(path)

      return ok ? ctx.success(result) : ctx.failures()
    })
  }
}

export const record = <K extends Codec<string>, V extends Codec<unknown>>(
  keys: K,
  values: V
) => new RecordCodec(keys, values)
