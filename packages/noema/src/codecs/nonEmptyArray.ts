import { AnyCodec, Codec, ErrorOf, InputOf, TypeOf } from "../Codec.js"
import { InvalidArray, TooShort } from "../DecodeError.js"
import { MinLengthMetadata } from "../Metadata.js"
import { array, ArrayCodec } from "./array.js"
import { minLength } from "./minLength.js"

export type NonEmptyArray<T> = [T, ...T[]]

export type NonEmptyArrayCodec<C extends AnyCodec> = Codec<
  NonEmptyArray<InputOf<C>>,
  NonEmptyArray<TypeOf<C>>,
  ErrorOf<C> | InvalidArray | TooShort,
  MinLengthMetadata<ArrayCodec<C>>
>
// For whatever reason, coverage doesn't seem to work here.
/* c8 ignore start */
export const nonEmptyArray = <C extends AnyCodec>(
  codec: C
): NonEmptyArrayCodec<C> =>
  minLength(array(codec), 1) as unknown as NonEmptyArrayCodec<C>
