import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../../Codec.js"
import { InvalidArray, invalidArray } from "../../DecodeError.js"
import { failure, failures, Result, success } from "../../Result.js"
import { isArray, pushErrors } from "../../utils.js"
import { NonEmptyArray } from "../nonEmptyArray.js"

export interface SetCodec<C extends AnyCodec>
  extends Codec<InputOf<C>[], Set<TypeOf<C>>, ErrorOf<C> | InvalidArray> {
  readonly metadata: {
    tag: "fromJson.set"
    simple: false
  }
}
export const set = <C extends AnyCodec>(codec: C): SetCodec<C> => {
  return createCodec(
    (val): Result<Set<TypeOf<C>>, ErrorOf<C> | InvalidArray> => {
      if (!isArray(val)) return failure(invalidArray(val))

      let ok = true
      const errors: ErrorOf<C>[] = []
      const set = new Set<TypeOf<C>>()

      for (let i = 0; i < val.length; i++) {
        const result = codec.decode(val[i]) as ResultOf<C>
        if (!result.ok) {
          ok = false
          pushErrors(errors, result.errors, i)
        } else if (ok) {
          set.add(result.value)
        }
      }

      return ok
        ? success(set)
        : failures(errors as unknown as NonEmptyArray<ErrorOf<C>>)
    },
    codec.metadata.simple
      ? (set) => [...set] as InputOf<C>[]
      : (set) => {
          const result: InputOf<C>[] = []
          for (const value of set) result.push(codec.encode(value))
          return result
        },
    { tag: "fromJson.set", simple: false }
  )
}
