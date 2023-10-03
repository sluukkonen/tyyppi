import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { InvalidObject, invalidObject } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { isObject } from "../utils.js"

interface UnknownRecordMetadata extends SimpleMetadata {
  readonly tag: "unknownRecord"
}

export type UnknownRecordCodec = SimpleCodec<
  Record<string, unknown>,
  InvalidObject,
  UnknownRecordMetadata
>

export const unknownRecord: UnknownRecordCodec = createSimpleCodec(
  (val) =>
    isObject(val)
      ? success(val as Record<string, unknown>)
      : failure(invalidObject(val)),
  { tag: "unknownRecord", simple: true },
)
