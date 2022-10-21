import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { StringMetadata } from "../Metadata.js"

type StringCodec = SimpleCodec<string, StringMetadata>

export const string: StringCodec = createSimpleCodec(
  (val, ctx) =>
    typeof val === "string"
      ? ctx.success(val)
      : ctx.failure({
          code: "invalid_type",
          path: ctx.path,
        }),
  {
    tag: "string",
    simple: true,
  }
)
