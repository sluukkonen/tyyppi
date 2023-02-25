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
import { hasOwnProperty, identity, isObject, pushErrors } from "../utils.js"
import { RecordMetadata } from "../Metadata.js"
import { invalidObject, InvalidObject } from "../DecodeError.js"
import { failure, failures, Result, success } from "../Result.js"
import { NonEmptyArray } from "./nonEmptyArray.js"

export type RecordCodec<K extends AnySimpleCodec, V extends AnyCodec> = Codec<
  Record<InputOf<K>, InputOf<V>>,
  Record<TypeOf<K>, TypeOf<V>>,
  ErrorOf<K | V> | InvalidObject,
  RecordMetadata<K, V>
>

export const record = <K extends AnySimpleCodec, V extends AnyCodec>(
  keys: K,
  values: V
): RecordCodec<K, V> => {
  const simple = values.metadata.simple
  return createCodec(
    (
      val
    ): Result<Record<TypeOf<K>, TypeOf<V>>, ErrorOf<K | V> | InvalidObject> => {
      if (!isObject(val)) return failure(invalidObject())

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

      return ok
        ? success(object)
        : failures(errors as unknown as NonEmptyArray<ErrorOf<K> | ErrorOf<V>>)
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
