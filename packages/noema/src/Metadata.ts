import { AnyCodec, AnySimpleCodec, Codec, TypeOf } from "./Codec.js"
import { Literal } from "./codecs/literal.js"
import { Ordered } from "./types.js"

type IsSimple<C extends AnyCodec> = C["metadata"]["simple"]

export interface Metadata {
  readonly tag?: string
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

export interface BigIntMetadata extends SimpleMetadata {
  readonly tag: "bigint"
}

export interface BooleanMetadata extends SimpleMetadata {
  readonly tag: "boolean"
}

export interface DateMetadata extends SimpleMetadata {
  readonly tag: "date"
}

export interface DateFromISOStringMetadata extends Metadata {
  readonly tag: "dateFromISOString"
  readonly simple: false
}

export interface EnumMetadata<T extends Literal> extends SimpleMetadata {
  readonly tag: "enum"
  readonly members: T[]
}

export interface IntegerMetadata extends SimpleMetadata {
  readonly tag: "integer"
}

export interface NullMetadata extends SimpleMetadata {
  readonly tag: "null"
}

export interface UndefinedMetadata extends SimpleMetadata {
  readonly tag: "undefined"
}

export interface NullableMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "nullable"
  readonly simple: IsSimple<C>
  readonly codec: C
}

export interface NumberMetadata extends SimpleMetadata {
  readonly tag: "number"
}

export interface LiteralMetadata<T extends Literal> extends SimpleMetadata {
  readonly tag: "literal"
  readonly value: T
}

export interface MaxMetadata<C extends Codec<any, Ordered>> extends Metadata {
  readonly tag: "max"
  readonly simple: IsSimple<C>
  readonly max: TypeOf<C>
  readonly codec: C
}

export interface MinMetadata<C extends Codec<any, Ordered>> extends Metadata {
  readonly tag: "min"
  readonly simple: IsSimple<C>
  readonly min: TypeOf<C>
  readonly codec: C
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

export interface RangeMetadata<C extends Codec<any, Ordered>> extends Metadata {
  readonly tag: "range"
  readonly simple: IsSimple<C>
  readonly min: TypeOf<C>
  readonly max: TypeOf<C>
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

export interface TupleMetadata<C extends readonly AnyCodec[] | []>
  extends Metadata {
  readonly tag: "tuple"
  readonly simple: IsSimple<C[number]>
  readonly members: C
}

export interface UnionMetadata<C extends readonly AnySimpleCodec[] | []>
  extends SimpleMetadata {
  readonly tag: "union"
  readonly members: C
}

export interface UnknownMetadata extends SimpleMetadata {
  readonly tag: "unknown"
}
