import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { NumberMetadata } from "../Metadata.js"
import { InvalidType } from "../DecodeError.js"
import { failure, Result, success } from "../Result.js"

export type NumberCodec = SimpleCodec<number, InvalidType, NumberMetadata>

export const number: NumberCodec = createSimpleCodec(
  (val): Result<number, InvalidType> =>
    typeof val === "number"
      ? success(val)
      : failure({
          code: "invalid_type",
          path: [],
        }),
  {
    tag: "number",
    simple: true,
  }
)
