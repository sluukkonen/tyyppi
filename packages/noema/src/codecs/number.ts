import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { NumberMetadata } from "../Metadata.js"
import { InvalidNumber } from "../DecodeError.js"
import { failure, success } from "../Result.js"

export type NumberCodec = SimpleCodec<number, InvalidNumber, NumberMetadata>

export const number: NumberCodec = createSimpleCodec(
  (val) =>
    typeof val === "number"
      ? success(val)
      : failure({
          code: "invalid_number",
          actual: val,
          path: [],
        }),
  {
    tag: "number",
    simple: true,
  }
)
