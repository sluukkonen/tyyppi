import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  Metadata,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { invalidSet, InvalidSet } from "../DecodeError.js"
import { failure, failures, success } from "../Result.js"
import { identity, isSet } from "../utils.js"
import { NonEmptyArray } from "./nonEmptyArray.js"

interface SetMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "set"
  readonly simple: IsSimple<C>
  readonly items: C
}

export type SetCodec<C extends AnyCodec> = Codec<
  Set<InputOf<C>>,
  Set<TypeOf<C>>,
  ErrorOf<C> | InvalidSet,
  SetMetadata<C>
>

export const set = <C extends AnyCodec>(items: C): SetCodec<C> => {
  const simple = items.meta.simple
  return createCodec(
    (val) => {
      if (!isSet(val)) return failure(invalidSet(val))

      let ok = true
      const errors: ErrorOf<C>[] = []
      const set: Set<TypeOf<C>> = simple ? (val as Set<TypeOf<C>>) : new Set()

      for (const value of val) {
        const result = items.decode(value) as ResultOf<C>
        if (!result.ok) {
          ok = false
          errors.push(...result.errors)
        } else if (!simple && ok) {
          set.add(result.value)
        }
      }

      return ok
        ? success(set)
        : failures(errors as unknown as NonEmptyArray<ErrorOf<C>>)
    },
    simple
      ? (identity as (value: Set<TypeOf<C>>) => Set<InputOf<C>>)
      : (set) => {
          const result = new Set<InputOf<C>>()
          for (const value of set) {
            result.add(items.encode(value))
          }
          return result
        },
    { tag: "set", simple, items }
  )
}
