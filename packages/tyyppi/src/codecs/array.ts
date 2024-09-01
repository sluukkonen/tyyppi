import {
  AnyCodec,
  Codec,
  createCodec,
  InputOf,
  IsSimple,
  Metadata,
  TypeOf,
} from "../Codec.js"
import { DecodeError } from "../errors/index.js"
import { invalidArray } from "../errors/utils.js"
import { failure, failures, success } from "../Result.js"
import { identity, isArray, pushErrors } from "../utils.js"

interface ArrayMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "array"
  readonly simple: IsSimple<C>
  readonly items: C
}

export type ArrayCodec<C extends AnyCodec> = Codec<
  InputOf<C>[],
  TypeOf<C>[],
  ArrayMetadata<C>
>

export const array = <C extends AnyCodec>(items: C): ArrayCodec<C> => {
  const simple = items.meta.simple

  return createCodec(
    (val) => {
      if (!isArray(val)) return failure(invalidArray(val))

      let ok = true
      const errors: DecodeError[] = []
      const array = simple ? val : []

      for (let i = 0; i < val.length; i++) {
        const element = val[i]
        const result = items.decode(element)

        if (!result.ok) {
          ok = false
          pushErrors(errors, result.errors, [i])
        } else if (!simple && ok) {
          array.push(result.value)
        }
      }

      return ok ? success(array) : failures(errors)
    },
    simple ? identity : (array) => array.map((value) => items.encode(value)),
    { tag: "array", simple, items },
  )
}
