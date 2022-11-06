import {
  AnyCodec,
  AnySimpleCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { hasOwnProperty, identity, pushErrors } from "../utils.js"
import { RecordMetadata } from "../Metadata.js"
import { InvalidRecord } from "../DecodeError.js"
import { failure, failures, Result, success } from "../Result.js"

type RecordCodec<K extends AnySimpleCodec, V extends AnyCodec> = Codec<
  Record<InputOf<K>, InputOf<V>>,
  Record<TypeOf<K>, TypeOf<V>>,
  ErrorOf<K | V> | InvalidRecord,
  RecordMetadata<K, V>
>

export function record<K extends AnySimpleCodec, V extends AnyCodec>(
  keys: K,
  values: V
): RecordCodec<K, V> {
  const simple = values.metadata.simple
  return createCodec(
    (
      val
    ): Result<Record<TypeOf<K>, TypeOf<V>>, ErrorOf<K | V> | InvalidRecord> => {
      if (val == null || typeof val !== "object" || Array.isArray(val))
        return failure({
          code: "invalid_record",
          path: [],
        })

      let ok = true
      const errors: Array<ErrorOf<K> | ErrorOf<V>> = []
      const object: any = simple ? val : {}

      for (const key in val) {
        if (hasOwnProperty(val, key)) {
          const keyResult = keys.decode(key) as ResultOf<K>
          if (!keyResult.ok) {
            ok = false
            pushErrors(errors, keyResult.errors, key)
            continue
          }

          const result = values.decode(val[key]) as ResultOf<V>
          if (!result.ok) {
            ok = false
            pushErrors(errors, result.errors, key)
          } else if (!simple && ok && result.value !== undefined) {
            object[key] = result.value
          }
        }
      }

      return ok ? success(object) : failures(errors)
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
