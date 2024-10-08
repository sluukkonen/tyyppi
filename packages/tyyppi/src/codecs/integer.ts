import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidInteger, isInfinite, isNaNError } from "../errors/index.js"
import { invalidNumber } from "../errors/utils.js"
import { failure, success } from "../Result.js"
import { isFinite, isInteger, isNaN, isNumber } from "../utils.js"

interface IntegerMetadata extends SimpleMetadata {
  readonly tag: "integer"
}

export type IntegerCodec = SimpleCodec<number, IntegerMetadata>

export const integer: IntegerCodec = createSimpleCodec(
  (val) =>
    isInteger(val)
      ? success(val)
      : failure(
          isNumber(val)
            ? isFinite(val)
              ? invalidInteger()
              : isNaN(val)
                ? isNaNError()
                : isInfinite({ val })
            : invalidNumber(val),
        ),
  {
    tag: "integer",
    simple: true,
  },
)
