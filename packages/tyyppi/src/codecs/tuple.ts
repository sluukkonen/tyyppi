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
import { tooLong } from "../errors/tooLong.js"
import { tooShort } from "../errors/tooShort.js"
import { invalidArray } from "../errors/utils.js"
import { failure, failures, success } from "../Result.js"
import { identity, isArray, isEveryCodecSimple, pushErrors } from "../utils.js"

type InputsOf<C extends readonly unknown[]> = C extends readonly [
  infer First extends AnyCodec,
  ...infer Rest,
]
  ? [InputOf<First>, ...InputsOf<Rest>]
  : []

type TypesOf<C extends readonly unknown[]> = C extends readonly [
  infer First extends AnyCodec,
  ...infer Rest,
]
  ? [TypeOf<First>, ...TypesOf<Rest>]
  : []

interface TupleMetadata<C extends readonly AnyCodec[] | []> extends Metadata {
  readonly tag: "tuple"
  readonly simple: IsSimple<C[number]>
  readonly items: C
}

export type TupleCodec<C extends readonly AnyCodec[] | []> = Codec<
  InputsOf<C>,
  TypesOf<C>,
  TupleMetadata<C>
>

export const tuple = <C extends readonly AnyCodec[] | []>(
  items: C,
): TupleCodec<C> => {
  const simple = isEveryCodecSimple(items)
  const length = items.length
  return createCodec(
    (val) => {
      if (!isArray(val)) {
        return failure(invalidArray(val))
      } else if (val.length < length) {
        return failure(tooShort({ val, length: val.length, minLength: length }))
      } else if (val.length > length) {
        return failure(tooLong({ val, length: val.length, maxLength: length }))
      }

      let ok = true
      const errors: DecodeError[] = []
      const array = simple ? val : []

      for (let i = 0; i < length; i++) {
        const value = val[i]
        const codec = items[i]
        const result = codec.decode(value)
        if (!result.ok) {
          ok = false
          pushErrors(errors, result.errors, [i])
        } else if (!simple && ok) {
          array.push(result.value)
        }
      }

      return ok ? success(array as TypesOf<C>) : failures(errors)
    },
    simple
      ? identity
      : (array) =>
          array.map((value, i) => items[i].encode(value)) as InputsOf<C>,
    {
      tag: "tuple",
      simple,
      items,
    },
  )
}
