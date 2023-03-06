import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { InvalidObject, invalidObject } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { isObject } from "../utils.js"

export interface UnknownRecordCodec
  extends SimpleCodec<Record<string, unknown>, InvalidObject> {
  readonly metadata: {
    readonly tag: "unknownRecord"
    readonly simple: true
  }
}

export const unknownRecord: UnknownRecordCodec = createSimpleCodec(
  (val) =>
    isObject(val)
      ? success(val as Record<string, unknown>)
      : failure(invalidObject(val)),
  { tag: "unknownRecord", simple: true }
)
