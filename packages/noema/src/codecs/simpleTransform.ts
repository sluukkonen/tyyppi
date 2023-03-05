import { AnySimpleCodec, ErrorOf, SimpleCodec, TypeOf } from "../Codec.js"
import { identity } from "../utils.js"
import { transform } from "./transform.js"

export interface SimpleTransformCodec<C extends AnySimpleCodec>
  extends SimpleCodec<TypeOf<C>, ErrorOf<C>> {
  readonly metadata: {
    readonly tag: "transform"
    readonly simple: true
    readonly codec: C
  }
}
export const simpleTransform = <C extends AnySimpleCodec>(
  codec: C,
  forwards: (value: TypeOf<C>) => TypeOf<C>
): SimpleTransformCodec<C> =>
  transform(codec, forwards, identity) as SimpleTransformCodec<C>
