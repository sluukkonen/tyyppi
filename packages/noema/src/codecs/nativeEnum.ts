import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { InvalidEnum, invalidEnum } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { EnumLike } from "../types.js"
import { isNumber, isString } from "../utils.js"

interface NativeEnumMetadata<T extends EnumLike> extends SimpleMetadata {
  readonly tag: "nativeEnum"
  readonly enum: T
}

export type NativeEnumCodec<T extends EnumLike> = SimpleCodec<
  T[keyof T],
  InvalidEnum<T[keyof T]>,
  NativeEnumMetadata<T>
>

export const nativeEnum = <T extends EnumLike>(
  enumObj: T
): NativeEnumCodec<T> => {
  const members = Object.values(enumObj).filter(
    (v) =>
      // Filter out reverse mappings for numeric enums
      !isString(v) || !isNumber(enumObj[v as any])
  ) as T[keyof T][]
  const set = new Set(members)

  return createSimpleCodec(
    (val) =>
      set.has(val as T[keyof T])
        ? success(val as T[keyof T])
        : failure(invalidEnum(val, members)),
    { tag: "nativeEnum", simple: true, enum: enumObj }
  )
}
