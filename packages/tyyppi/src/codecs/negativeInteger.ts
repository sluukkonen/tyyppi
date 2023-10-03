import { integer, IntegerCodec } from "./integer.js"
import { max, MaxCodec } from "./max.js"

export type NegativeIntegerCodec = MaxCodec<IntegerCodec>

export const negativeInteger: NegativeIntegerCodec = max(integer, -1)
