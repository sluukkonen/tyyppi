import { Props } from "../types.js"
import { object, ObjectCodec } from "./object.js"

export const merge = <A extends Props, B extends Props>(
  first: ObjectCodec<A>,
  second: ObjectCodec<B>
): ObjectCodec<A & B> => object({ ...first.meta.props, ...second.meta.props })
