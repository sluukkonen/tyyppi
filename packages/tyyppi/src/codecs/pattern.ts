import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  Metadata,
  MetadataOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { invalidPattern, InvalidPattern } from "../DecodeError.js"
import { failure } from "../Result.js"

interface PatternMetadata extends Metadata {
  readonly pattern: RegExp
}

export type PatternCodec<C extends Codec<any, string>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | InvalidPattern,
  MetadataOf<C> & PatternMetadata
>

export const pattern = <C extends Codec<any, string>>(
  codec: C,
  pattern: RegExp,
): PatternCodec<C> =>
  createCodec(
    (val) => {
      const result = codec.decode(val) as ResultOf<C>
      return result.ok
        ? pattern.test(result.value)
          ? result
          : failure(invalidPattern(pattern))
        : result
    },
    codec.encode,
    { ...codec.meta, pattern },
  )
