import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { identity, isArray, pushErrors } from "../utils.js"
import { ArrayMetadata } from "../Metadata.js"
import { invalidArray, InvalidArray } from "../DecodeError.js"
import { failure, failures, Result, success } from "../Result.js"
import { NonEmptyArray } from "./nonEmptyArray.js"

export type ArrayCodec<C extends AnyCodec> = Codec<
  InputOf<C>[],
  TypeOf<C>[],
  ErrorOf<C> | InvalidArray,
  ArrayMetadata<C>
>

export const array = <C extends AnyCodec>(codec: C): ArrayCodec<C> => {
  const simple = codec.metadata.simple
  return createCodec(
    (val): Result<TypeOf<C>[], ErrorOf<C> | InvalidArray> => {
      if (!isArray(val)) return failure(invalidArray())

      let ok = true
      const errors: ErrorOf<C>[] = []
      const array: TypeOf<C>[] = simple ? (val as TypeOf<C>[]) : []

      for (let i = 0; i < val.length; i++) {
        const element = val[i]
        const result = codec.decode(element) as ResultOf<C>
        if (!result.ok) {
          ok = false
          pushErrors(errors, result.errors, i)
        } else if (!simple && ok) {
          array.push(result.value)
        }
      }

      return ok
        ? success(array)
        : failures(errors as unknown as NonEmptyArray<ErrorOf<C>>)
    },
    simple ? identity : (array) => array.map((value) => codec.encode(value)),
    { tag: "array", simple, codec }
  )
}
