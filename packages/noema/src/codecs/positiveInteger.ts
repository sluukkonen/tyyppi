import { integer, IntegerCodec } from "./integer.js"
import { min, MinCodec } from "./min.js"

export type PositiveIntegerCodec = MinCodec<IntegerCodec>

export const positiveInteger: PositiveIntegerCodec = min(integer, 1)
