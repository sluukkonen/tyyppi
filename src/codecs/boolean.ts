import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { BooleanMetadata } from "../Metadata.js"

type BooleanCodec = SimpleCodec<boolean, BooleanMetadata>

export const boolean: BooleanCodec = createSimpleCodec(
  (val, ctx) =>
    typeof val === "boolean"
      ? ctx.success(val)
      : ctx.failure({
          code: "invalid_type",
          path: ctx.path,
        }),
  {
    tag: "boolean",
    simple: true,
  }
)
