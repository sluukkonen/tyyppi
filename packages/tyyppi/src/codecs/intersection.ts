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
import { failures, success } from "../Result.js"
import { identity, isEveryCodecSimple, isObject } from "../utils.js"

type IntersectInputsOf<T extends readonly unknown[]> = T extends readonly [
  infer C extends AnyCodec,
  ...infer Rest,
]
  ? InputOf<C> & IntersectInputsOf<Rest>
  : unknown

type IntersectTypesOf<T extends readonly unknown[]> = T extends readonly [
  infer C extends AnyCodec,
  ...infer Rest,
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
  IntersectionMetadata<C>
>

export const intersection = <C extends readonly AnyCodec[]>(
  ...codecs: C
): IntersectionCodec<C> => {
  const simple = isEveryCodecSimple(codecs)
  return createCodec(
    (val) => {
      let ok = true
      const errors: DecodeError[] = []
      let intersection: any = simple ? val : undefined

      for (const codec of codecs) {
        const result = codec.decode(val)

        if (!result.ok) {
          ok = false
          errors.push(...result.errors)
        } else if (!simple && ok) {
          intersection = intersect(intersection, result.value)
        }
      }

      return ok ? success(intersection) : failures(errors)
    },
    simple
      ? identity
      : (intersection) => {
          let result: any

          for (const codec of codecs) {
            result = intersect(result, codec.encode(intersection))
          }

          return result
        },
    { tag: "intersection", simple, codecs },
  )
}

const intersect = <A, B>(a: A, b: B) =>
  isObject(a) && isObject(b) ? { ...a, ...b } : b
