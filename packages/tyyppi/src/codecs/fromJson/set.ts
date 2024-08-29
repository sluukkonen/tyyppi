import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  Metadata,
  ResultOf,
  TypeOf,
} from "../../Codec.js"
import { InvalidArray, invalidArray } from "../../DecodeError.js"
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
  ErrorOf<C> | InvalidArray,
  SetMetadata<C>
>
export const set = <C extends AnyCodec>(items: C): SetCodec<C> => {
  return createCodec(
    (val) => {
      if (!isArray(val)) return failure(invalidArray(val))

      let ok = true
      const errors: ErrorOf<C>[] = []
      const set = new Set<TypeOf<C>>()

      for (let i = 0; i < val.length; i++) {
        const result = items.decode(val[i]) as ResultOf<C>
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
      ? (set) => [...set] as InputOf<C>[]
      : (set) => {
          const result: InputOf<C>[] = []
          for (const value of set) result.push(items.encode(value))
          return result
        },
    { tag: "fromJson.set", simple: false, items },
  )
}
