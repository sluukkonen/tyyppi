import { AnyCodec } from "../Codec.js"
import { array, ArrayCodec } from "./array.js"
import { minLength, MinLengthCodec } from "./minLength.js"

export type NonEmptyArrayCodec<C extends AnyCodec> = MinLengthCodec<
  ArrayCodec<C>
>

export const nonEmptyArray = <C extends AnyCodec>(
  codec: C,
): NonEmptyArrayCodec<C> => minLength(array(codec), 1)
