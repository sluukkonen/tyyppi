import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidEnum, InvalidEnum } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { Primitive } from "../types.js"

interface EnumMetadata<T extends Primitive> extends SimpleMetadata {
  readonly tag: "enum"
  readonly members: readonly T[]
}

export type EnumCodec<T extends Primitive> = SimpleCodec<
  T,
  InvalidEnum<T>,
  EnumMetadata<T>
>

function enumCodec<T extends Primitive>(
  ...members: readonly T[]
): EnumCodec<T> {
  const set = new Set(members)
  return createSimpleCodec(
    (val) =>
      set.has(val as T)
        ? success(val as T)
        : failure(invalidEnum(val, members)),
    { tag: "enum", simple: true, members },
  )
}

export { enumCodec, enumCodec as enum }
