import { AnyCodec, Codec, InputOf, MetadataOf, TypeOf } from "../Codec.js"

declare const BRAND: unique symbol

interface Brand<B> {
  readonly [BRAND]: B
}

export type BrandedCodec<C extends AnyCodec, B> = Codec<
  InputOf<C>,
  TypeOf<C> & Brand<B>,
  MetadataOf<C>
>

export const brand = <C extends AnyCodec, B extends string>(
  codec: C,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  brand: B,
): BrandedCodec<C, B> => codec
