import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  Metadata,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { success } from "../Result.js"

interface DefaultToMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "default"
  readonly simple: false
  readonly defaultValue: TypeOf<C>
}

export type DefaultToCodec<C extends AnyCodec> = Codec<
  InputOf<C> | undefined,
  TypeOf<C>,
  ErrorOf<C>,
  DefaultToMetadata<C>
>

export const defaultTo = <C extends AnyCodec>(
  codec: C,
  defaultValue: TypeOf<C>
): DefaultToCodec<C> =>
  createCodec(
    (val) =>
      val === undefined
        ? success(defaultValue)
        : (codec.decode(val) as ResultOf<C>),
    codec.encode,
    { tag: "default", simple: false, defaultValue }
  )
