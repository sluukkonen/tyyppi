import {
  AnyCodec,
  Codec,
  createCodec,
  InputOf,
  IsSimple,
  Metadata,
  TypeOf,
} from "../Codec.js"
import { DecodeError, invalidType } from "../errors/index.js"
import { failure, failures, success } from "../Result.js"
import { identity, isMap } from "../utils.js"

interface MapMetadata<K extends AnyCodec, V extends AnyCodec> extends Metadata {
  readonly tag: "map"
  readonly simple: IsSimple<V | K>
  readonly keys: K
  readonly values: V
}

export type MapCodec<K extends AnyCodec, V extends AnyCodec> = Codec<
  Map<InputOf<K>, InputOf<V>>,
  Map<TypeOf<K>, TypeOf<V>>,
  MapMetadata<K, V>
>

export const map = <K extends AnyCodec, V extends AnyCodec>(
  keys: K,
  values: V,
): MapCodec<K, V> => {
  const simple = keys.meta.simple && values.meta.simple
  return createCodec(
    (val) => {
      if (!isMap(val)) return failure(invalidType({ val, expected: "map" }))

      let ok = true
      const errors: DecodeError[] = []
      const map = simple ? val : new Map()

      for (const [key, value] of val) {
        const keyResult = keys.decode(key)
        if (!keyResult.ok) {
          ok = false
          errors.push(...keyResult.errors)
          continue
        }

        const valueResult = values.decode(value)
        if (!valueResult.ok) {
          ok = false
          errors.push(...valueResult.errors)
        } else if (!simple && ok) {
          map.set(keyResult.value, valueResult.value)
        }
      }

      return ok ? success(map) : failures(errors)
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
    { tag: "map", simple, keys, values },
  )
}
