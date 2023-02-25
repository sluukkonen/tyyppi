import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  TypeOf,
} from "../Codec.js"
import { invalidTuple, InvalidTuple } from "../DecodeError.js"
import { TupleMetadata } from "../Metadata.js"
import { failure, failures, Result, success } from "../Result.js"
import { identity, isArray, pushErrors } from "../utils.js"

type InputsOf<C extends readonly unknown[]> = C extends readonly [
  infer First extends AnyCodec,
  ...infer Rest
]
  ? [InputOf<First>, ...InputsOf<Rest>]
  : []

type TypesOf<C extends readonly unknown[]> = C extends readonly [
  infer First extends AnyCodec,
  ...infer Rest
]
  ? [TypeOf<First>, ...TypesOf<Rest>]
  : []

type TupleCodec<C extends readonly AnyCodec[] | []> = Codec<
  InputsOf<C>,
  TypesOf<C>,
  ErrorOf<C[number]> | InvalidTuple,
  TupleMetadata<C>
>

export function tuple<C extends readonly AnyCodec[] | []>(
  members: C
): TupleCodec<C> {
  const simple = members.every((c) => c.metadata.simple)
  const length = members.length
  return createCodec(
    (val): Result<TypesOf<C>, ErrorOf<C[number]> | InvalidTuple> => {
      if (!isArray(val) || val.length !== length) {
        return failure(invalidTuple())
      }

      let ok = true
      const errors: ErrorOf<C[number]>[] = []
      const array: any[] = simple ? val : []

      for (let i = 0; i < length; i++) {
        const value = val[i]
        const codec = members[i]
        const result = codec.decode(value)
        if (!result.ok) {
          ok = false
          pushErrors(errors, result.errors, i)
        } else if (!simple && ok) {
          array.push(result.value)
        }
      }

      return ok ? success(array as TypesOf<C>) : failures(errors)
    },
    simple
      ? identity
      : (array) => array.map((value, i) => members[i].encode(value)) as any,
    {
      tag: "tuple",
      simple,
      members,
    }
  )
}
