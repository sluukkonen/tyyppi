import { Codec } from "../Codec.js"
import { HasLength } from "../types.js"
import { maxLength, MaxLengthCodec } from "./maxLength.js"
import { minLength, MinLengthCodec } from "./minLength.js"

export type LengthCodec<C extends Codec<HasLength, any>> = MinLengthCodec<
  MaxLengthCodec<C>
>

export const length = <C extends Codec<HasLength, any>>(
  codec: C,
  length: number
) => minLength(maxLength(codec, length), length)
