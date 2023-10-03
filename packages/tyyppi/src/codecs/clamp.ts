import { Codec, TypeOf } from "../Codec.js"
import { Ordered } from "../types.js"
import { MaxCodec, max as maxCodec } from "./max.js"
import { MinCodec, min as minCodec } from "./min.js"

export type ClampCodec<C extends Codec<any, Ordered>> = MinCodec<MaxCodec<C>>

export const clamp = <C extends Codec<any, Ordered>>(
  codec: C,
  min: TypeOf<C>,
  max: TypeOf<C>,
): ClampCodec<C> =>
  minCodec(maxCodec(codec, max), min as unknown as TypeOf<MaxCodec<C>>)
