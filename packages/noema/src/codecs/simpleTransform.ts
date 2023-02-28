import { AnySimpleCodec, ErrorOf, SimpleCodec, TypeOf } from "../Codec.js"
import { SimpleTransformMetadata } from "../Metadata.js"
import { identity } from "../utils.js"
import { transform } from "./transform.js"

export type SimpleTransformCodec<C extends AnySimpleCodec> = SimpleCodec<
  TypeOf<C>,
  ErrorOf<C>,
  SimpleTransformMetadata<C>
>
export const simpleTransform = <C extends AnySimpleCodec>(
  codec: C,
  forwards: (value: TypeOf<C>) => TypeOf<C>
): SimpleTransformCodec<C> =>
  transform(codec, forwards, identity) as SimpleTransformCodec<C>
