import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { UnknownMetadata } from "../Metadata.js"
import { success } from "../Result.js"

type UnknownCodec = SimpleCodec<unknown, never, UnknownMetadata>

export const unknown: UnknownCodec = /* @__PURE__ */ createSimpleCodec(
  success,
  {
    tag: "unknown",
    simple: true,
  }
)
