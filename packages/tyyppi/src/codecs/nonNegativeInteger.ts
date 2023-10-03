import { integer, IntegerCodec } from "./integer.js"
import { min, MinCodec } from "./min.js"

export type NonNegativeIntegerCodec = MinCodec<IntegerCodec>

export const nonNegativeInteger: NonNegativeIntegerCodec = min(integer, 0)
