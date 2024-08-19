import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  Metadata,
  TypeOf,
} from "../../Codec.js"
import {
  InvalidArray,
  invalidArray,
  TooLong,
  tooLong,
  TooShort,
  tooShort,
} from "../../DecodeError.js"
import { failure, failures, success } from "../../Result.js"
import { isArray, pushError, pushErrors } from "../../utils.js"
import { NonEmptyArray } from "../nonEmptyArray.js"

interface MapMetadata<K extends AnyCodec, V extends AnyCodec> extends Metadata {
  readonly tag: "fromJson.map"
  readonly simple: false
  readonly keys: K
  readonly values: V
}

export type MapCodec<K extends AnyCodec, V extends AnyCodec> = Codec<
  [InputOf<K>, InputOf<V>][],
  Map<TypeOf<K>, TypeOf<V>>,
  ErrorOf<K | V> | InvalidArray | TooShort | TooLong,
  MapMetadata<K, V>
>

export const map = <K extends AnyCodec, V extends AnyCodec>(
  keys: K,
  values: V,
): MapCodec<K, V> => {
  const simple = keys.meta.simple && values.meta.simple
  return createCodec(
    (val) => {
      if (!isArray(val)) return failure(invalidArray(val))

      let ok = true
      const errors: ErrorOf<MapCodec<K, V>>[] = []
      const map = new Map<TypeOf<K>, TypeOf<V>>()

      for (let i = 0; i < val.length; i++) {
        const tuple = val[i]
        if (!isArray(tuple)) {
          ok = false
          pushError(errors, invalidArray(tuple), [i])
          continue
        } else if (tuple.length < 2) {
          ok = false
          pushError(errors, tooShort(tuple, 2), [i])
          continue
        } else if (tuple.length > 2) {
          ok = false
          pushError(errors, tooLong(tuple, 2), [i])
          continue
        }

        const keyResult = keys.decode(tuple[0])
        if (!keyResult.ok) {
          ok = false
          pushErrors(errors, keyResult.errors, [i, 0])
          continue
        }

        const valueResult = values.decode(tuple[1])
        if (!valueResult.ok) {
          ok = false
          pushErrors(errors, valueResult.errors, [i, 1])
        } else if (ok) {
          map.set(keyResult.value, valueResult.value)
        }
      }

      return ok
        ? success(map)
        : failures(errors as unknown as NonEmptyArray<ErrorOf<MapCodec<K, V>>>)
    },
    simple
      ? (map) => [...map.entries()] as [InputOf<K>, InputOf<V>][]
      : (map) => {
          const array: [InputOf<K>, InputOf<V>][] = []

          for (const [key, value] of map) {
            array.push([keys.encode(key), values.encode(value)])
          }

          return array
        },
    {
      tag: "fromJson.map",
      simple: false,
      keys,
      values,
    },
  )
}
