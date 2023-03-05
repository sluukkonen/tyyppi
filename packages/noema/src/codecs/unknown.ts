import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { success } from "../Result.js"

export interface UnknownCodec extends SimpleCodec<unknown, never> {
  readonly metadata: {
    readonly tag: "unknown"
    readonly simple: true
  }
}

export const unknown: UnknownCodec = createSimpleCodec(success, {
  tag: "unknown",
  simple: true,
})
