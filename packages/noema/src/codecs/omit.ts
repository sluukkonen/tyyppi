import { AnyCodec } from "../Codec.js"
import { entries, fromEntries } from "../utils.js"
import { object, ObjectCodec } from "./object.js"

/* c8 ignore start */
export const omit = <T extends Record<string, AnyCodec>, K extends keyof T>(
  codec: ObjectCodec<T>,
  keys: readonly K[]
): ObjectCodec<Omit<T, K>> =>
  object(
    fromEntries(
      entries(codec.meta.props).filter(([k]) => !keys.includes(k as K))
    )
  ) as unknown as ObjectCodec<Omit<T, K>>
