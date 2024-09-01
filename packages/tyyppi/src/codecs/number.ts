import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { isInfinite, isNaNError } from "../errors/index.js"
import { invalidNumber } from "../errors/utils.js"
import { failure, success } from "../Result.js"
import { isFinite, isNaN, isNumber } from "../utils.js"

interface NumberMetadata extends SimpleMetadata {
  readonly tag: "number"
}

export type NumberCodec = SimpleCodec<number, NumberMetadata>

export const number: NumberCodec = createSimpleCodec(
  (val) =>
    isFinite(val)
      ? success(val)
      : failure(
          isNumber(val)
            ? isNaN(val)
              ? isNaNError()
              : isInfinite({ val })
            : invalidNumber(val),
        ),
  {
    tag: "number",
    simple: true,
  },
)
