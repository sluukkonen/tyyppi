import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { NumberMetadata } from "../Metadata.js"
import { InvalidNumber } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { isNumber } from "../utils.js"

export type NumberCodec = SimpleCodec<number, InvalidNumber, NumberMetadata>

export const number: NumberCodec = createSimpleCodec(
  (val) =>
    isNumber(val) && Number.isFinite(val)
      ? success(val)
      : failure({ code: "invalid_number", path: [] }),
  {
    tag: "number",
    simple: true,
  }
)
