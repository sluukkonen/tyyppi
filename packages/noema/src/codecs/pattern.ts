import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  Metadata,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { invalidPattern, InvalidPattern } from "../DecodeError.js"
import { failure } from "../Result.js"

interface PatternMetadata<C extends Codec<any, string>> extends Metadata {
  readonly tag: "pattern"
  readonly simple: IsSimple<C>
  readonly regexp: RegExp
  readonly codec: C
}

export type PatternCodec<C extends Codec<any, string>> = Codec<
  InputOf<C>,
  TypeOf<C>,
  ErrorOf<C> | InvalidPattern,
  PatternMetadata<C>
>

export const pattern = <C extends Codec<any, string>>(
  codec: C,
  regexp: RegExp
): PatternCodec<C> =>
  createCodec(
    (val) => {
      const result = codec.decode(val) as ResultOf<C>
      return result.ok
        ? regexp.test(result.value)
          ? result
          : failure(invalidPattern(regexp))
        : result
    },
    codec.encode,
    {
      tag: "pattern",
      simple: codec.meta.simple,
      regexp,
      codec,
    }
  )
