import { Merge, Props } from "../types.js"
import { object, ObjectCodec } from "./object.js"

export const extend = <A extends Props, B extends Props>(
  codec: ObjectCodec<A>,
  props: B,
): ObjectCodec<Merge<A, B>> => object({ ...codec.meta.props, ...props }) as any
