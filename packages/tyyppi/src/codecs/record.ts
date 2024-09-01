import {
  AnyCodec,
  AnySimpleCodec,
  Codec,
  createCodec,
  InputOf,
  IsSimple,
  Metadata,
  TypeOf,
} from "../Codec.js"
import { DecodeError } from "../errors/index.js"
import { invalidObject } from "../errors/utils.js"
import { failure, failures, success } from "../Result.js"
import { hasOwnProperty, identity, isObject, pushErrors } from "../utils.js"

interface RecordMetadata<K extends AnySimpleCodec, V extends AnyCodec>
  extends Metadata {
  readonly tag: "record"
  readonly simple: IsSimple<V>
  readonly keys: K
  readonly values: V
}

export type RecordCodec<K extends AnySimpleCodec, V extends AnyCodec> = Codec<
  Record<InputOf<K>, InputOf<V>>,
  Record<TypeOf<K>, TypeOf<V>>,
  RecordMetadata<K, V>
>

export const record = <K extends AnySimpleCodec, V extends AnyCodec>(
  keys: K,
  values: V,
): RecordCodec<K, V> => {
  const simple = values.meta.simple
  return createCodec(
    (val) => {
      if (!isObject(val)) return failure(invalidObject(val))

      let ok = true
      const errors: DecodeError[] = []
      const object: any = simple ? val : {}

      for (const key in val) {
        if (hasOwnProperty(val, key)) {
          const keyResult = keys.decode(key)
          if (!keyResult.ok) {
            ok = false
            pushErrors(errors, keyResult.errors, [key])
            continue
          }

          const valueResult = values.decode(val[key])
          if (!valueResult.ok) {
            ok = false
            pushErrors(errors, valueResult.errors, [key])
          } else if (!simple && ok && valueResult.value !== undefined) {
            object[key] = valueResult.value
          }
        }
      }

      return ok ? success(object) : failures(errors)
    },
    simple
      ? identity
      : (record) => {
          const result = {} as any

          for (const key in record) {
            if (hasOwnProperty(record, key)) {
              result[key] = values.encode(record[key])
            }
          }

          return result
        },
    { tag: "record", simple, keys, values },
  )
}
