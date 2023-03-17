import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  Metadata,
  TypeOf,
} from "../Codec.js"
import {
  InvalidObject,
  invalidObject,
  InvalidTaggedUnion,
  invalidTaggedUnion,
} from "../DecodeError.js"
import { failure } from "../Result.js"
import { Literal } from "../types.js"
import {
  hasOwnProperty,
  identity,
  isEveryCodecSimple,
  isObject,
} from "../utils.js"

interface TaggedUnionMetadata<
  K extends string,
  V extends Literal,
  C extends TaggedUnionMember<K, V>
> extends Metadata {
  readonly tag: "taggedUnion"
  readonly simple: IsSimple<C>
  readonly key: K
  readonly options: readonly V[]
  readonly members: readonly C[]
}

export type TaggedUnionCodec<
  K extends string,
  V extends Literal,
  C extends TaggedUnionMember<K, V>
> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | InvalidObject | InvalidTaggedUnion<V>,
  TaggedUnionMetadata<K, V, C>
>

export type TaggedUnionMember<K extends string, V extends Literal> = Codec<
  Record<K, V>,
  Record<K, V>
>

export function taggedUnion<
  K extends string,
  V1 extends Literal,
  C1 extends TaggedUnionMember<K, V1>
>(key: K, first: readonly [value: V1, codec: C1]): TaggedUnionCodec<K, V1, C1>
export function taggedUnion<
  K extends string,
  V1 extends Literal,
  C1 extends TaggedUnionMember<K, V1>,
  V2 extends Literal,
  C2 extends TaggedUnionMember<K, V2>
>(
  key: K,
  first: readonly [value: V1, codec: C1],
  second: readonly [value: V2, codec: C2]
): TaggedUnionCodec<K, V1 | V2, C1 | C2>
export function taggedUnion<
  K extends string,
  V1 extends Literal,
  C1 extends TaggedUnionMember<K, V1>,
  V2 extends Literal,
  C2 extends TaggedUnionMember<K, V2>,
  V3 extends Literal,
  C3 extends TaggedUnionMember<K, V3>
>(
  key: K,
  first: readonly [value: V1, codec: C1],
  second: readonly [value: V2, codec: C2],
  third: readonly [value: V3, codec: C3]
): TaggedUnionCodec<K, V1 | V2 | V3, C1 | C2 | C3>
export function taggedUnion<
  K extends string,
  V1 extends Literal,
  C1 extends TaggedUnionMember<K, V1>,
  V2 extends Literal,
  C2 extends TaggedUnionMember<K, V2>,
  V3 extends Literal,
  C3 extends TaggedUnionMember<K, V3>,
  V4 extends Literal,
  C4 extends TaggedUnionMember<K, V4>
>(
  key: K,
  first: readonly [value: V1, codec: C1],
  second: readonly [value: V2, codec: C2],
  third: readonly [value: V3, codec: C3],
  fourth: readonly [value: V4, codec: C4]
): TaggedUnionCodec<K, V1 | V2 | V3 | V4, C1 | C2 | C3 | C4>
export function taggedUnion<
  K extends string,
  V1 extends Literal,
  C1 extends TaggedUnionMember<K, V1>,
  V2 extends Literal,
  C2 extends TaggedUnionMember<K, V2>,
  V3 extends Literal,
  C3 extends TaggedUnionMember<K, V3>,
  V4 extends Literal,
  C4 extends TaggedUnionMember<K, V4>,
  V5 extends Literal,
  C5 extends TaggedUnionMember<K, V5>
>(
  key: K,
  first: readonly [value: V1, codec: C1],
  second: readonly [value: V2, codec: C2],
  third: readonly [value: V3, codec: C3],
  fourth: readonly [value: V4, codec: C4],
  fifth: readonly [value: V5, codec: C5]
): TaggedUnionCodec<K, V1 | V2 | V3 | V4 | V5, C1 | C2 | C3 | C4 | C5>
export function taggedUnion<
  K extends string,
  V1 extends Literal,
  C1 extends TaggedUnionMember<K, V1>,
  V2 extends Literal,
  C2 extends TaggedUnionMember<K, V2>,
  V3 extends Literal,
  C3 extends TaggedUnionMember<K, V3>,
  V4 extends Literal,
  C4 extends TaggedUnionMember<K, V4>,
  V5 extends Literal,
  C5 extends TaggedUnionMember<K, V5>,
  V6 extends Literal,
  C6 extends TaggedUnionMember<K, V6>
>(
  key: K,
  first: readonly [value: V1, codec: C1],
  second: readonly [value: V2, codec: C2],
  third: readonly [value: V3, codec: C3],
  fourth: readonly [value: V4, codec: C4],
  fifth: readonly [value: V5, codec: C5],
  sixth: readonly [value: V6, codec: C6]
): TaggedUnionCodec<K, V1 | V2 | V3 | V4 | V5 | V6, C1 | C2 | C3 | C4 | C5 | C6>
export function taggedUnion<
  K extends string,
  V1 extends Literal,
  C1 extends TaggedUnionMember<K, V1>,
  V2 extends Literal,
  C2 extends TaggedUnionMember<K, V2>,
  V3 extends Literal,
  C3 extends TaggedUnionMember<K, V3>,
  V4 extends Literal,
  C4 extends TaggedUnionMember<K, V4>,
  V5 extends Literal,
  C5 extends TaggedUnionMember<K, V5>,
  V6 extends Literal,
  C6 extends TaggedUnionMember<K, V6>,
  V7 extends Literal,
  C7 extends TaggedUnionMember<K, V7>
>(
  key: K,
  first: readonly [value: V1, codec: C1],
  second: readonly [value: V2, codec: C2],
  third: readonly [value: V3, codec: C3],
  fourth: readonly [value: V4, codec: C4],
  fifth: readonly [value: V5, codec: C5],
  sixth: readonly [value: V6, codec: C6],
  seventh: readonly [value: V7, codec: C7]
): TaggedUnionCodec<
  K,
  V1 | V2 | V3 | V4 | V5 | V6 | V7,
  C1 | C2 | C3 | C4 | C5 | C6 | C7
>
export function taggedUnion<
  K extends string,
  V1 extends Literal,
  C1 extends TaggedUnionMember<K, V1>,
  V2 extends Literal,
  C2 extends TaggedUnionMember<K, V2>,
  V3 extends Literal,
  C3 extends TaggedUnionMember<K, V3>,
  V4 extends Literal,
  C4 extends TaggedUnionMember<K, V4>,
  V5 extends Literal,
  C5 extends TaggedUnionMember<K, V5>,
  V6 extends Literal,
  C6 extends TaggedUnionMember<K, V6>,
  V7 extends Literal,
  C7 extends TaggedUnionMember<K, V7>,
  V8 extends Literal,
  C8 extends TaggedUnionMember<K, V8>
>(
  key: K,
  first: readonly [value: V1, codec: C1],
  second: readonly [value: V2, codec: C2],
  third: readonly [value: V3, codec: C3],
  fourth: readonly [value: V4, codec: C4],
  fifth: readonly [value: V5, codec: C5],
  sixth: readonly [value: V6, codec: C6],
  seventh: readonly [value: V7, codec: C7],
  eighth: readonly [value: V8, codec: C8]
): TaggedUnionCodec<
  K,
  V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8,
  C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8
>
export function taggedUnion<
  K extends string,
  V1 extends Literal,
  C1 extends TaggedUnionMember<K, V1>,
  V2 extends Literal,
  C2 extends TaggedUnionMember<K, V2>,
  V3 extends Literal,
  C3 extends TaggedUnionMember<K, V3>,
  V4 extends Literal,
  C4 extends TaggedUnionMember<K, V4>,
  V5 extends Literal,
  C5 extends TaggedUnionMember<K, V5>,
  V6 extends Literal,
  C6 extends TaggedUnionMember<K, V6>,
  V7 extends Literal,
  C7 extends TaggedUnionMember<K, V7>,
  V8 extends Literal,
  C8 extends TaggedUnionMember<K, V8>,
  V9 extends Literal,
  C9 extends TaggedUnionMember<K, V9>
>(
  key: K,
  first: readonly [value: V1, codec: C1],
  second: readonly [value: V2, codec: C2],
  third: readonly [value: V3, codec: C3],
  fourth: readonly [value: V4, codec: C4],
  fifth: readonly [value: V5, codec: C5],
  sixth: readonly [value: V6, codec: C6],
  seventh: readonly [value: V7, codec: C7],
  eighth: readonly [value: V8, codec: C8],
  ninth: readonly [value: V9, codec: C9]
): TaggedUnionCodec<
  K,
  V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8 | V9,
  C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9
>
export function taggedUnion<
  K extends string,
  V1 extends Literal,
  C1 extends TaggedUnionMember<K, V1>,
  V2 extends Literal,
  C2 extends TaggedUnionMember<K, V2>,
  V3 extends Literal,
  C3 extends TaggedUnionMember<K, V3>,
  V4 extends Literal,
  C4 extends TaggedUnionMember<K, V4>,
  V5 extends Literal,
  C5 extends TaggedUnionMember<K, V5>,
  V6 extends Literal,
  C6 extends TaggedUnionMember<K, V6>,
  V7 extends Literal,
  C7 extends TaggedUnionMember<K, V7>,
  V8 extends Literal,
  C8 extends TaggedUnionMember<K, V8>,
  V9 extends Literal,
  C9 extends TaggedUnionMember<K, V9>,
  V10 extends Literal,
  C10 extends TaggedUnionMember<K, V10>
>(
  key: K,
  first: readonly [value: V1, codec: C1],
  second: readonly [value: V2, codec: C2],
  third: readonly [value: V3, codec: C3],
  fourth: readonly [value: V4, codec: C4],
  fifth: readonly [value: V5, codec: C5],
  sixth: readonly [value: V6, codec: C6],
  seventh: readonly [value: V7, codec: C7],
  eighth: readonly [value: V8, codec: C8],
  ninth: readonly [value: V9, codec: C9],
  tenth: readonly [value: V10, codec: C10]
): TaggedUnionCodec<
  K,
  V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8 | V9 | V10,
  C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10
>
export function taggedUnion<
  K extends string,
  V extends Literal,
  M extends readonly [value: V, codec: TaggedUnionMember<K, V>][]
>(key: K, ...mapping: M): TaggedUnionCodec<K, V, M[number][1]> {
  const codecs = new Map(mapping)

  const options = mapping.map((m) => m[0])
  const members = mapping.map((m) => m[1])
  const simple = isEveryCodecSimple(members)

  return createCodec(
    (val) => {
      if (!isObject(val)) return failure(invalidObject(val))
      if (!hasOwnProperty(val, key))
        return failure(invalidTaggedUnion(key, undefined, options))

      const value = val[key]
      const codec = codecs.get(value as V)
      return codec
        ? (codec.decode(val) as any)
        : failure(invalidTaggedUnion(key, value, options))
    },
    simple
      ? identity
      : (object) => {
          const codec = codecs.get(object[key]) as AnyCodec
          return codec.encode(object)
        },
    { tag: "taggedUnion", simple, key, options, members: members }
  )
}
