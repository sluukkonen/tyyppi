import {
  AnyCodec,
  Codec,
  ErrorOf,
  InputOf,
  IsSimple,
  Metadata,
  TypeOf,
} from "../Codec.js"
import { InvalidArray, TooShort } from "../DecodeError.js"
import { array } from "./array.js"
import { minLength } from "./minLength.js"

export type NonEmptyArray<T> = [T, ...T[]]

interface NonEmptyArrayMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "minLength"
  readonly simple: IsSimple<C>
  readonly minLength: number
  readonly codec: C
}

export type NonEmptyArrayCodec<C extends AnyCodec> = Codec<
  NonEmptyArray<InputOf<C>>,
  NonEmptyArray<TypeOf<C>>,
  ErrorOf<C> | InvalidArray | TooShort,
  NonEmptyArrayMetadata<C>
>

export const nonEmptyArray = <C extends AnyCodec>(
  codec: C,
): NonEmptyArrayCodec<C> =>
  minLength(array(codec), 1) as unknown as NonEmptyArrayCodec<C>
