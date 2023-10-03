import { Props } from "../types.js"
import { mapObject } from "../utils.js"
import { object, ObjectCodec } from "./object.js"
import { optional, OptionalCodec } from "./optional.js"

type OptionalProps<T extends Props> = { [K in keyof T]: OptionalCodec<T[K]> }

export type PartialCodec<T extends Props> = ObjectCodec<OptionalProps<T>>

export const partial = <T extends Props>(
  codec: ObjectCodec<T>,
): PartialCodec<T> =>
  object(mapObject(codec.meta.props, optional)) as unknown as PartialCodec<T>
