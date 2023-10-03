import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  MetadataOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { success } from "../Result.js"

interface DefaultValueMetadata<T> {
  readonly optional: true
  readonly simple: false
  readonly defaultValue: T
}

export type DefaultValueCodec<C extends AnyCodec> = Codec<
  InputOf<C> | undefined,
  TypeOf<C>,
  ErrorOf<C>,
  Omit<MetadataOf<C>, "simple"> & DefaultValueMetadata<TypeOf<C>>
>

export const defaultValue = <C extends AnyCodec>(
  codec: C,
  defaultValue: TypeOf<C>
): DefaultValueCodec<C> =>
  createCodec(
    (val) =>
      val === undefined
        ? success(defaultValue)
        : (codec.decode(val) as ResultOf<C>),
    codec.encode,
    { ...codec.meta, simple: false, optional: true, defaultValue } as any
  )
