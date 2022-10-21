import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { NumberMetadata } from "../Metadata.js"

type NumberCodec = SimpleCodec<number, NumberMetadata>

export const number: NumberCodec = createSimpleCodec(
  (val, ctx) =>
    typeof val === "number"
      ? ctx.success(val)
      : ctx.failure({
          code: "invalid_type",
          path: ctx.path,
        }),
  {
    tag: "number",
    simple: true,
  }
)
