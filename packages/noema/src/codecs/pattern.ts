import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { invalidPattern, InvalidPattern } from "../DecodeError.js"
import { PatternMetadata } from "../Metadata.js"
import { failure, Result } from "../Result.js"

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
    (val): Result<TypeOf<C>, ErrorOf<C> | InvalidPattern> => {
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
      simple: codec.metadata.simple,
      codec,
    }
  )
