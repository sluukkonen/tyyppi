import {
  AnyCodec,
  Codec,
  ErrorOf,
  InputOf,
  IsSimple,
  TypeOf,
} from "../Codec.js"
import { InvalidArray, TooShort } from "../DecodeError.js"
import { array } from "./array.js"
import { minLength } from "./minLength.js"

export type NonEmptyArray<T> = readonly [T, ...T[]]

export interface NonEmptyArrayCodec<C extends AnyCodec>
  extends Codec<
    NonEmptyArray<InputOf<C>>,
    NonEmptyArray<TypeOf<C>>,
    ErrorOf<C> | InvalidArray | TooShort
  > {
  readonly metadata: {
    readonly tag: "minLength"
    readonly simple: IsSimple<C>
    readonly minLength: number
    readonly codec: C
  }
}
// For whatever reason, coverage doesn't seem to work here.
/* c8 ignore start */
export const nonEmptyArray = <C extends AnyCodec>(
  codec: C
): NonEmptyArrayCodec<C> =>
  minLength(array(codec), 1) as unknown as NonEmptyArrayCodec<C>
