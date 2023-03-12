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
import { InvalidObject } from "../DecodeError.js"
import { failures, Result, success } from "../Result.js"
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
    (val): Result<IntersectTypesOf<C>, ErrorOf<C[number]>> => {
      let ok = true
      const errors: ErrorOf<C[number]>[] = []
      let intersection: any = simple ? val : undefined

      for (const codec of codecs) {
        const result = codec.decode(val) as ResultOf<C[number]>

        if (!result.ok) {
          ok = false
          errors.push(...result.errors)
        } else if (!simple && ok) {
          intersection = intersect(intersection, result.value)
        }
      }

      return ok
        ? success(intersection)
        : failures(errors as unknown as NonEmptyArray<ErrorOf<C[number]>>)
    },
    simple
      ? (identity as any)
      : (intersection) => {
          let result: any

          for (const codec of codecs) {
            result = intersect(result, codec.encode(intersection))
          }

          return result
        },
    { tag: "intersection", simple, codecs }
  )
}

const intersect = <A, B>(a: A, b: B) =>
  isObject(a) && isObject(b) ? { ...a, ...b } : b
