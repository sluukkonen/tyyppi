import { AnyCodec, AnySimpleCodec } from "./Codec.js"
import { Literal } from "./codecs/literal.js"

type IsSimple<C extends AnyCodec> = C["metadata"]["simple"]

export interface Metadata {
  readonly tag: string
  readonly simple: boolean
}

export interface SimpleMetadata extends Metadata {
  readonly simple: true
}

export interface ArrayMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "array"
  readonly simple: IsSimple<C>
  readonly codec: C
}

export interface BooleanMetadata extends SimpleMetadata {
  readonly tag: "boolean"
}

export interface DateMetadata extends Metadata {
  readonly tag: "date"
  readonly simple: false
}

export interface EnumMetadata<T extends Literal> extends SimpleMetadata {
  readonly tag: "enum"
  readonly members: T[]
}

export interface NullMetadata extends SimpleMetadata {
  readonly tag: "null"
}

export interface UndefinedMetadata extends SimpleMetadata {
  readonly tag: "undefined"
}

export interface NumberMetadata extends SimpleMetadata {
  readonly tag: "number"
}

export interface LiteralMetadata<T extends Literal> extends SimpleMetadata {
  readonly tag: "literal"
  readonly value: T
}

export interface ObjectMetadata<T extends Record<string, AnyCodec>>
  extends Metadata {
  readonly tag: "object"
  readonly simple: IsSimple<T[keyof T]>
  readonly props: T
}

export interface OptionalMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "optional"
  readonly simple: IsSimple<C>
  readonly codec: C
}

export interface RecordMetadata<K extends AnySimpleCodec, V extends AnyCodec> {
  readonly tag: "record"
  readonly simple: IsSimple<V>
  readonly keys: K
  readonly values: V
}

export interface StringMetadata extends SimpleMetadata {
  readonly tag: "string"
}

export interface UnionMetadata<C extends readonly AnySimpleCodec[] | []>
  extends SimpleMetadata {
  readonly tag: "union"
  readonly members: C
}

export interface UnknownMetadata extends SimpleMetadata {
  readonly tag: "unknown"
}
