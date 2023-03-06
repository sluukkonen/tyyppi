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
import { InvalidObject, invalidObject } from "../DecodeError.js"
import { failure, failures, Result, success } from "../Result.js"
import { identity, isEveryCodecSimple, isObject } from "../utils.js"
import { NonEmptyArray } from "./nonEmptyArray.js"

type IntersectInputsOf<T extends readonly unknown[]> = T extends readonly [
  infer C extends AnyCodec,
  ...infer Rest
]
  ? InputOf<C> & IntersectInputsOf<Rest>
  : unknown

type IntersectTypesOf<T extends readonly unknown[]> = T extends readonly [
  infer C extends AnyCodec,
  ...infer Rest
]
  ? TypeOf<C> & IntersectTypesOf<Rest>
  : unknown

interface IntersectionMetadata<C extends readonly AnyCodec[]> extends Metadata {
  readonly tag: "intersection"
  readonly simple: IsSimple<C[number]>
  readonly codecs: C
}

export type IntersectionCodec<C extends readonly AnyCodec[]> = Codec<
  IntersectInputsOf<C>,
  IntersectTypesOf<C>,
  ErrorOf<C[number]> | InvalidObject,
  IntersectionMetadata<C>
>

export const intersection = <C extends readonly AnyCodec[]>(
  ...codecs: C
): IntersectionCodec<C> => {
  const simple = isEveryCodecSimple(codecs)
  return createCodec(
    (val): Result<IntersectTypesOf<C>, ErrorOf<C[number]> | InvalidObject> => {
      if (!isObject(val)) return failure(invalidObject(val))

      let ok = true
      const errors: ErrorOf<C[number]>[] = []
      const object: any = simple ? val : {}

      for (const codec of codecs) {
        const result = codec.decode(val) as ResultOf<C[number]>

        if (!result.ok) {
          ok = false
          errors.push(...result.errors)
        } else if (!simple && ok) {
          Object.assign(object as any, result.value)
        }
      }

      return ok
        ? success(object)
        : failures(errors as unknown as NonEmptyArray<ErrorOf<C[number]>>)
    },
    simple
      ? (identity as any)
      : (object) => {
          const result = {} as IntersectInputsOf<C>

          for (const codec of codecs) {
            Object.assign(result as any, codec.encode(object))
          }

          return result
        },
    { tag: "intersection", simple, codecs }
  )
}
