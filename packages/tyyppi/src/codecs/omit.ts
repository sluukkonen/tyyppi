import { Props } from "../types.js"
import { entries, fromEntries } from "../utils.js"
import { object, ObjectCodec } from "./object.js"

export const omit = <T extends Props, K extends keyof T>(
  codec: ObjectCodec<T>,
  keys: readonly K[],
): ObjectCodec<Omit<T, K>> =>
  object(
    fromEntries(
      entries(codec.meta.props).filter(([k]) => !keys.includes(k as K)),
    ),
  ) as unknown as ObjectCodec<Omit<T, K>>
