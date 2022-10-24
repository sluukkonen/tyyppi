import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { identity } from "../utils.js"
import { ArrayMetadata } from "../Metadata.js"
import { InvalidType } from "../DecodeError.js"
import { failure, failures, Result, success } from "../Result.js"

type ArrayCodec<C extends AnyCodec> = Codec<
  InputOf<C>[],
  TypeOf<C>[],
  ErrorOf<C> | InvalidType,
  ArrayMetadata<C>
>

export function array<C extends AnyCodec>(codec: C): ArrayCodec<C> {
  const simple = codec.metadata.simple
  return createCodec(
    (val, path): Result<TypeOf<C>[], ErrorOf<C> | InvalidType> => {
      if (!Array.isArray(val)) return failure({ code: "invalid_type", path })

      let ok = true
      const errors: ErrorOf<C>[] = []
      const array: TypeOf<C>[] = simple ? val : []

      for (let i = 0; i < val.length; i++) {
        const element = val[i]
        const result = codec.validate(
          element,
          path ? `${path}[${i}]` : String(i)
        ) as ResultOf<C>
        if (!result.ok) {
          ok = false
          errors.push(...result.errors)
        } else if (!simple && ok) {
          array.push(result.value)
        }
      }

      return ok ? success(array) : failures(errors)
    },
    simple ? identity : (array) => array.map((value) => codec.encode(value)),
    { tag: "array", simple, codec }
  )
}
