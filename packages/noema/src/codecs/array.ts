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
import { invalidArray, InvalidArray } from "../DecodeError.js"
import { failure, failures, Result, success } from "../Result.js"
import { identity, isArray, pushErrors } from "../utils.js"
import { NonEmptyArray } from "./nonEmptyArray.js"

interface ArrayMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "array"
  readonly simple: IsSimple<C>
  readonly codec: C
}

export type ArrayCodec<C extends AnyCodec> = Codec<
  InputOf<C>[],
  TypeOf<C>[],
  ErrorOf<C> | InvalidArray,
  ArrayMetadata<C>
>

export const array = <C extends AnyCodec>(codec: C): ArrayCodec<C> => {
  const simple = codec.meta.simple
  return createCodec(
    (val): Result<TypeOf<C>[], ErrorOf<C> | InvalidArray> => {
      if (!isArray(val)) return failure(invalidArray(val))

      let ok = true
      const errors: ErrorOf<C>[] = []
      const array: TypeOf<C>[] = simple ? (val as TypeOf<C>[]) : []

      for (let i = 0; i < val.length; i++) {
        const element = val[i]
        const result = codec.decode(element) as ResultOf<C>
        if (!result.ok) {
          ok = false
          pushErrors(errors, result.errors, [i])
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
