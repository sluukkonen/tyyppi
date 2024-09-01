import {
  Codec,
  createCodec,
  InputOf,
  Metadata,
  MetadataOf,
  TypeOf,
} from "../Codec.js"

import { invalidPattern } from "../errors/index.js"
import { failure } from "../Result.js"

interface PatternMetadata extends Metadata {
  readonly pattern: RegExp
}

export type PatternCodec<C extends Codec<any, string>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  MetadataOf<C> & PatternMetadata
>

export const pattern = <C extends Codec<any, string>>(
  codec: C,
  pattern: RegExp,
): PatternCodec<C> =>
  createCodec(
    (val) => {
      const result = codec.decode(val)
      return result.ok
        ? pattern.test(result.value)
          ? result
          : failure(invalidPattern({ regexp: pattern }))
        : result
    },
    codec.encode,
    { ...codec.meta, pattern },
  )
