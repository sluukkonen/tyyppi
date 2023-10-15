import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  Metadata,
  TypeOf,
} from "../Codec.js"
import {
  DecodeError,
  InvalidDiscriminatedUnion,
  invalidDiscriminatedUnion,
  InvalidObject,
  invalidObject,
} from "../DecodeError.js"
import { failure } from "../Result.js"
import { Primitive } from "../types.js"
import {
  hasOwnProperty,
  identity,
  isEveryCodecSimple,
  isObject,
} from "../utils.js"
import { LiteralCodec } from "./literal.js"

export interface DiscriminatedUnionMetadata<
  K extends string,
  C extends DiscriminatedUnionMember<K, Primitive>
> extends Metadata {
  readonly tag: "discriminatedUnion"
  readonly simple: IsSimple<C>
  readonly members: readonly C[]
}
interface DiscriminatedUnionMemberMetadata<
  K extends string,
  V extends Primitive
> extends Metadata {
  readonly props: Record<K, LiteralCodec<V>>
}

type DiscriminatedUnionMember<K extends string, V extends Primitive> = Codec<
  Record<K, V>,
  Record<K, V>,
  DecodeError,
  DiscriminatedUnionMemberMetadata<K, V>
>

export type DiscriminatedUnionCodec<
  K extends string,
  C extends DiscriminatedUnionMember<K, Primitive>
> = Codec<
  InputOf<C>,
  TypeOf<C>,
  | ErrorOf<C>
  | InvalidObject
  | InvalidDiscriminatedUnion<C["meta"]["props"][K]["meta"]["value"]>,
  DiscriminatedUnionMetadata<K, C>
>

export const discriminatedUnion = <
  K extends string,
  C extends readonly DiscriminatedUnionMember<K, Primitive>[] | []
>(
  key: K,
  ...members: C
): DiscriminatedUnionCodec<K, C[number]> => {
  const simple = isEveryCodecSimple(members)
  const codecs = new Map(
    members.map((codec) => [codec.meta.props[key].meta.value, codec])
  )
  const options = Array.from(codecs.keys())
  return createCodec(
    (val) => {
      if (!isObject(val)) return failure(invalidObject(val))
      if (!hasOwnProperty(val, key))
        return failure(invalidDiscriminatedUnion(key, options))

      const codec = codecs.get(val[key] as Primitive)
      return codec
        ? codec.decode(val)
        : failure(invalidDiscriminatedUnion(key, options))
    },
    simple
      ? identity
      : (val) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const codec = codecs.get(val[key])!
          return codec.encode(val)
        },
    { tag: "discriminatedUnion", simple, members }
  ) as unknown as DiscriminatedUnionCodec<K, C[number]>
}
