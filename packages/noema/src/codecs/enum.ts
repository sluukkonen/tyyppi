import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidEnum, InvalidEnum } from "../DecodeError.js"
import { EnumMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"
import { Literal } from "../types.js"

export type EnumCodec<T extends Literal> = SimpleCodec<
  T,
  InvalidEnum<T>,
  EnumMetadata<T>
>

function enumCodec<T extends Literal>(...members: readonly T[]): EnumCodec<T> {
  const set = new Set(members)
  return createSimpleCodec(
    (val) =>
      set.has(val as T) ? success(val as T) : failure(invalidEnum(members)),
    { tag: "enum", simple: true, members }
  )
}

export { enumCodec, enumCodec as enum }
