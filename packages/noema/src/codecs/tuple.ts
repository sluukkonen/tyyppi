import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  TypeOf,
} from "../Codec.js"
import {
  invalidArray,
  InvalidArray,
  tooLong,
  TooLong,
  tooShort,
  TooShort,
} from "../DecodeError.js"
import { failure, failures, Result, success } from "../Result.js"
import { identity, isArray, isEveryCodecSimple, pushErrors } from "../utils.js"
import { NonEmptyArray } from "./nonEmptyArray.js"

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

export interface TupleCodec<C extends readonly AnyCodec[] | []>
  extends Codec<
    InputsOf<C>,
    TypesOf<C>,
    ErrorOf<C[number]> | InvalidArray | TooShort | TooLong
  > {
  readonly metadata: {
    readonly tag: "tuple"
    readonly simple: IsSimple<C[number]>
    readonly members: C
  }
}

export const tuple = <C extends readonly AnyCodec[] | []>(
  members: C
): TupleCodec<C> => {
  const simple = isEveryCodecSimple(members)
  const length = members.length
  return createCodec(
    (
      val
    ): Result<
      TypesOf<C>,
      ErrorOf<C[number]> | InvalidArray | TooShort | TooLong
    > => {
      if (!isArray(val)) {
        return failure(invalidArray(val))
      } else if (val.length < length) {
        return failure(tooShort(val.length, length, length))
      } else if (val.length > length) {
        return failure(tooLong(val.length, length, length))
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
          pushErrors(errors, result.errors, [i])
        } else if (!simple && ok) {
          array.push(result.value)
        }
      }

      return ok
        ? success(array as TypesOf<C>)
        : failures(errors as unknown as NonEmptyArray<ErrorOf<C[number]>>)
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
