import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { success } from "../Result.js"

interface UnknownMetadata extends SimpleMetadata {
  readonly tag: "unknown"
}

export type UnknownCodec = SimpleCodec<unknown, never, UnknownMetadata>

export const unknown: UnknownCodec = createSimpleCodec(success, {
  tag: "unknown",
  simple: true,
})
