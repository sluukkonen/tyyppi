import { AnyCodec } from "../Codec.js"
import { object, ObjectCodec } from "./object.js"

export const extend = <
  A extends Record<string, AnyCodec>,
  B extends Record<string, AnyCodec>
>(
  codec: ObjectCodec<A>,
  props: B
): ObjectCodec<A & B> => object({ ...codec.meta.props, ...props })
