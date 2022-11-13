import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { InvalidInteger } from "../DecodeError.js"
import { IntegerMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"

type IntegerCodec = SimpleCodec<number, InvalidInteger, IntegerMetadata>

export const integer: IntegerCodec = /* @__PURE__ */ createSimpleCodec(
  (val) =>
    typeof val === "number" && Number.isInteger(val)
      ? success(val)
      : failure({
          code: "invalid_integer",
          actual: val,
          path: [],
        }),
  {
    tag: "integer",
    simple: true,
  }
)
