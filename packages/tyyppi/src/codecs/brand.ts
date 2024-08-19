import {
  AnyCodec,
  Codec,
  ErrorOf,
  InputOf,
  MetadataOf,
  TypeOf,
} from "../Codec.js"
import { identity } from "../utils.js"

declare const BRAND: unique symbol

interface Brand<B> {
  [BRAND]: B
}

export type BrandedCodec<C extends AnyCodec, B> = Codec<
  InputOf<C>,
  TypeOf<C> & Brand<B>,
  ErrorOf<C>,
  MetadataOf<C>
>

export const brand: <C extends AnyCodec, B extends string>(
  codec: C,
  brand: B,
) => BrandedCodec<C, B> = identity as any
