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

type Brand<B> = { [BRAND]: B }

export interface BrandedCodec<C extends AnyCodec, B>
  extends Codec<InputOf<C>, TypeOf<C> & Brand<B>, ErrorOf<C>> {
  readonly metadata: MetadataOf<C>
}

export const brand: <C extends AnyCodec, B extends string>(
  codec: C,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  brand: B
) => BrandedCodec<C, B> = identity as any
