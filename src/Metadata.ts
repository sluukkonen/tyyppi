import { Literal } from "./codecs/literal.js"
import { AnyCodec, AnySimpleCodec } from "./Codec.js"

export interface Metadata {
  readonly tag: string
  readonly simple: boolean
}

export interface SimpleMetadata extends Metadata {
  readonly simple: true
}

export interface ArrayMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "array"
  readonly simple: C["meta"]["simple"]
  readonly codec: C
}

export interface BooleanMetadata extends Metadata {
  readonly tag: "boolean"
  readonly simple: true
}

export interface DateMetadata extends Metadata {
  readonly tag: "date"
  readonly simple: false
}

export interface EnumMetadata<T extends Literal> extends Metadata {
  readonly tag: "enum"
  readonly simple: true
  readonly members: T[]
}

export interface NumberMetadata extends Metadata {
  readonly tag: "number"
  readonly simple: true
}

export interface LiteralMetadata<T extends Literal> extends Metadata {
  readonly tag: "literal"
  readonly simple: true
  readonly value: T
}

export interface ObjectMetadata<T extends Record<string, AnyCodec>>
  extends Metadata {
  readonly tag: "object"
  readonly simple: T[keyof T]["meta"]["simple"]
  readonly props: T
}

export interface OptionalMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "optional"
  readonly simple: C["meta"]["simple"]
  readonly codec: C
}

export interface RecordMetadata<K extends AnySimpleCodec, V extends AnyCodec> {
  readonly tag: "record"
  simple: V["meta"]["simple"]
  readonly keys: K
  readonly values: V
}

export interface StringMetadata extends Metadata {
  readonly tag: "string"
  readonly simple: true
}

export interface UnionMetadata<C extends readonly AnySimpleCodec[] | []>
  extends Metadata {
  readonly tag: "union"
  readonly simple: true
  readonly members: C
}
