import { integer, IntegerCodec } from "./integer.js"
import { max, MaxCodec } from "./max.js"

export type NonPositiveInteger = MaxCodec<IntegerCodec>

export const nonPositiveInteger: NonPositiveInteger = max(integer, 0)
