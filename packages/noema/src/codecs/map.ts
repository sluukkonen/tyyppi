import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { invalidMap, InvalidMap } from "../DecodeError.js"
import { failure, failures, Result, success } from "../Result.js"
import { identity, isMap } from "../utils.js"
import { NonEmptyArray } from "./nonEmptyArray.js"

export interface MapCodec<K extends AnyCodec, V extends AnyCodec>
  extends Codec<
    Map<InputOf<K>, InputOf<V>>,
    Map<TypeOf<K>, TypeOf<V>>,
    ErrorOf<K | V> | InvalidMap
  > {
  readonly metadata: {
    readonly tag: "map"
    readonly simple: IsSimple<V | K>
    readonly keys: K
    readonly values: V
  }
}

export const map = <K extends AnyCodec, V extends AnyCodec>(
  keys: K,
  values: V
): MapCodec<K, V> => {
  const simple = keys.metadata.simple && values.metadata.simple
  return createCodec(
    (val): Result<Map<TypeOf<K>, TypeOf<V>>, ErrorOf<K | V> | InvalidMap> => {
      if (!isMap(val)) return failure(invalidMap(val))

      let ok = true
      const errors: Array<ErrorOf<K | V>> = []
      const map: Map<TypeOf<K>, TypeOf<V>> = simple
        ? (val as Map<TypeOf<K>, TypeOf<V>>)
        : new Map()

      for (const [key, value] of val) {
        const keyResult = keys.decode(key) as ResultOf<K>
        if (!keyResult.ok) {
          ok = false
          errors.push(...keyResult.errors)
          continue
        }

        const result = values.decode(value) as ResultOf<V>
        if (!result.ok) {
          ok = false
          errors.push(...result.errors)
        } else if (!simple && ok) {
          map.set(keyResult.value, result.value)
        }
      }

      return ok
        ? success(map)
        : failures(errors as unknown as NonEmptyArray<ErrorOf<K | V>>)
    },
    simple
      ? identity
      : (map) => {
          const result = new Map()

          for (const [key, value] of map) {
            result.set(keys.encode(key), values.encode(value))
          }

          return result
        },
    { tag: "map", simple, keys, values }
  )
}
