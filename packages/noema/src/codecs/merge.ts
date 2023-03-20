import { AnyCodec } from "../Codec.js"
import { object, ObjectCodec } from "./object.js"

export const merge = <
  A extends Record<string, AnyCodec>,
  B extends Record<string, AnyCodec>
>(
  first: ObjectCodec<A>,
  second: ObjectCodec<B>
): ObjectCodec<A & B> => object({ ...first.meta.props, ...second.meta.props })
