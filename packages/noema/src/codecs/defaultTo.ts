import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { success } from "../Result.js"

export interface DefaultToCodec<C extends AnyCodec>
  extends Codec<InputOf<C> | undefined, TypeOf<C>, ErrorOf<C>> {
  readonly metadata: {
    readonly tag: "default"
    readonly simple: false
    readonly defaultValue: TypeOf<C>
  }
}

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
