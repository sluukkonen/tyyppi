import {
  AnyCodec,
  Codec,
  createCodec,
  InputOf,
  Metadata,
  TypeOf,
} from "../../Codec.js"
import { DecodeError } from "../../errors/index.js"
import { tooLong } from "../../errors/tooLong.js"
import { tooShort } from "../../errors/tooShort.js"
import { invalidArray } from "../../errors/utils.js"
import { failure, failures, success } from "../../Result.js"
import {
  isArray,
  isEveryCodecSimple,
  pushError,
  pushErrors,
} from "../../utils.js"

interface MapMetadata<K extends AnyCodec, V extends AnyCodec> extends Metadata {
  readonly tag: "fromJson.map"
  readonly simple: false
  readonly keys: K
  readonly values: V
}

export type MapCodec<K extends AnyCodec, V extends AnyCodec> = Codec<
  [InputOf<K>, InputOf<V>][],
  Map<TypeOf<K>, TypeOf<V>>,
  MapMetadata<K, V>
>

export const map = <K extends AnyCodec, V extends AnyCodec>(
  keys: K,
  values: V,
): MapCodec<K, V> =>
  createCodec(
    (val) => {
      if (!isArray(val)) return failure(invalidArray(val))

      let ok = true
      const errors: DecodeError[] = []
      const map = new Map<TypeOf<K>, TypeOf<V>>()

      for (let i = 0; i < val.length; i++) {
        const tuple = val[i]
        if (!isArray(tuple)) {
          ok = false
          pushError(errors, invalidArray(tuple), [i])
          continue
        } else if (tuple.length < 2) {
          ok = false
          pushError(
            errors,
            tooShort({ val: tuple, length: tuple.length, minLength: 2 }),
            [i],
          )
          continue
        } else if (tuple.length > 2) {
          ok = false
          pushError(
            errors,
            tooLong({ val: tuple, length: tuple.length, maxLength: 2 }),
            [i],
          )
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

      return ok ? success(map) : failures(errors)
    },
    isEveryCodecSimple([keys, values])
      ? (map) => [...map.entries()]
      : (map) =>
          Array.from(map.entries(), ([k, v]) => [
            keys.encode(k),
            values.encode(v),
          ]),
    {
      tag: "fromJson.map",
      simple: false,
      keys,
      values,
    },
  )
