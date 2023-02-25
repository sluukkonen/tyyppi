import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { UnknownMetadata } from "../Metadata.js"
import { success } from "../Result.js"

export type UnknownCodec = SimpleCodec<unknown, never, UnknownMetadata>

export const unknown: UnknownCodec = createSimpleCodec(success, {
  tag: "unknown",
  simple: true,
})
