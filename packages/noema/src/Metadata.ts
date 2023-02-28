import { AnyCodec, AnySimpleCodec, Codec, TypeOf } from "./Codec.js"
import { HasLength, Literal, Ordered } from "./types.js"

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

export interface LengthMetadata<C extends Codec<HasLength, any>>
  extends Metadata {
  readonly tag: "length"
  readonly simple: IsSimple<C>
  readonly minLength: number
  readonly maxLength: number
  readonly codec: C
}

export interface MapMetadata<K extends AnyCodec, V extends AnyCodec> {
  readonly tag: "map"
  readonly simple: IsSimple<V | K>
  readonly keys: K
  readonly values: V
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

export interface MaxLengthMetadata<C extends Codec<HasLength, any>>
  extends Metadata {
  readonly tag: "maxLength"
  readonly simple: IsSimple<C>
  readonly maxLength: number
  readonly codec: C
}

export interface MinLengthMetadata<C extends Codec<HasLength, any>>
  extends Metadata {
  readonly tag: "minLength"
  readonly simple: IsSimple<C>
  readonly minLength: number
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

export interface RefinementMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "refinement"
  readonly simple: IsSimple<C>
  readonly codec: C
}

export interface RecordMetadata<K extends AnySimpleCodec, V extends AnyCodec> {
  readonly tag: "record"
  readonly simple: IsSimple<V>
  readonly keys: K
  readonly values: V
}

export interface SetMetadata<C extends AnyCodec> extends Metadata {
  readonly tag: "set"
  readonly codec: C
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
