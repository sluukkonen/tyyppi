import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { Literal } from "./literal.js"
import { EnumMetadata } from "../Metadata.js"
import { InvalidEnum } from "../DecodeError.js"
import { failure, success } from "../Result.js"

type EnumCodec<T extends Literal> = SimpleCodec<
  T,
  InvalidEnum<T>,
  EnumMetadata<T>
>

function enumCodec<T extends Literal>(...members: T[]): EnumCodec<T> {
  const set = new Set(members)
  return createSimpleCodec(
    (val) =>
      set.has(val as T)
        ? success(val as T)
        : failure({
            code: "invalid_enum",
            actual: val,
            path: [],
            members,
          }),
    { tag: "enum", simple: true, members }
  )
}

export { enumCodec as enum }
