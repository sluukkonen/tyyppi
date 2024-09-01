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
import { identity, isSet } from "../utils.js"

interface SetMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "set"
  readonly simple: IsSimple<C>
  readonly items: C
}

export type SetCodec<C extends AnyCodec> = Codec<
  Set<InputOf<C>>,
  Set<TypeOf<C>>,
  SetMetadata<C>
>

export const set = <C extends AnyCodec>(items: C): SetCodec<C> => {
  const simple = items.meta.simple
  return createCodec(
    (val) => {
      if (!isSet(val)) return failure(invalidType({ val, expected: "set" }))

      let ok = true
      const errors: DecodeError[] = []
      const set: Set<TypeOf<C>> = simple ? val : new Set()

      for (const value of val) {
        const result = items.decode(value)
        if (!result.ok) {
          ok = false
          errors.push(...result.errors)
        } else if (!simple && ok) {
          set.add(result.value)
        }
      }

      return ok ? success(set) : failures(errors)
    },
    simple
      ? identity
      : (set) => {
          const result = new Set<InputOf<C>>()
          for (const value of set) {
            result.add(items.encode(value))
          }
          return result
        },
    { tag: "set", simple, items },
  )
}
