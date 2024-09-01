import {
  AnyCodec,
  Codec,
  createCodec,
  InputOf,
  Metadata,
  TypeOf,
} from "../../Codec.js"
import { DecodeError } from "../../errors/index.js"
import { invalidArray } from "../../errors/utils.js"
import { failure, failures, success } from "../../Result.js"
import { isArray, pushErrors } from "../../utils.js"

interface SetMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "fromJson.set"
  readonly simple: false
  readonly items: C
}

export type SetCodec<C extends AnyCodec> = Codec<
  InputOf<C>[],
  Set<TypeOf<C>>,
  SetMetadata<C>
>
export const set = <C extends AnyCodec>(items: C): SetCodec<C> =>
  createCodec(
    (val) => {
      if (!isArray(val)) return failure(invalidArray(val))

      let ok = true
      const errors: DecodeError[] = []
      const set = new Set<TypeOf<C>>()

      for (let i = 0; i < val.length; i++) {
        const result = items.decode(val[i])
        if (!result.ok) {
          ok = false
          pushErrors(errors, result.errors, [i])
        } else if (ok) {
          set.add(result.value)
        }
      }

      return ok ? success(set) : failures(errors)
    },
    items.meta.simple
      ? (set) => [...set]
      : (set) => Array.from(set, (v) => items.encode(v)),
    { tag: "fromJson.set", simple: false, items },
  )
