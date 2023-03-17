import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidEnum, InvalidEnum } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { Literal } from "../types.js"

interface EnumMetadata<T extends Literal> extends SimpleMetadata {
  readonly tag: "enum"
  readonly members: readonly T[]
}

export type EnumCodec<T extends Literal> = SimpleCodec<
  T,
  InvalidEnum<T>,
  EnumMetadata<T>
>

function enumCodec<T extends Literal>(...members: readonly T[]): EnumCodec<T> {
  const set = new Set(members)
  return createSimpleCodec(
    (val) =>
      set.has(val as T)
        ? success(val as T)
        : failure(invalidEnum(val, members)),
    { tag: "enum", simple: true, members }
  )
}

export { enumCodec, enumCodec as enum }
