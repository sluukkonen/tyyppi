import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidEnum, InvalidEnum } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { Literal } from "../types.js"

export interface EnumCodec<T extends Literal>
  extends SimpleCodec<T, InvalidEnum<T>> {
  readonly metadata: {
    readonly tag: "enum"
    readonly simple: true
    readonly members: readonly T[]
  }
}

function enumCodec<T extends Literal>(...members: readonly T[]): EnumCodec<T> {
  const set = new Set(members)
  return createSimpleCodec(
    (val) =>
      set.has(val as T) ? success(val as T) : failure(invalidEnum(members)),
    { tag: "enum", simple: true, members }
  )
}

export { enumCodec, enumCodec as enum }
