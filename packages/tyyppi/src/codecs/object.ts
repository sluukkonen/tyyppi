import {
  Codec,
  createCodec,
  InputOf,
  IsSimple,
  Metadata,
  TypeOf,
} from "../Codec.js"
import { DecodeError } from "../errors/index.js"
import { invalidObject } from "../errors/utils.js"
import { failure, failures, success } from "../Result.js"
import { Props } from "../types.js"
import {
  hasOwnProperty,
  identity,
  isEveryCodecSimple,
  isObject,
  pushErrors,
} from "../utils.js"

type RequiredKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? never : K
}[keyof T]

type Identity<T> = T

type Flatten<T> = Identity<{ [K in keyof T]: T[K] }>

type HandleOptionalTypes<T> = Flatten<
  {
    readonly [K in RequiredKeys<T>]: T[K]
  } & {
    readonly [K in Exclude<keyof T, RequiredKeys<T>>]?: Exclude<T[K], undefined>
  }
>

interface ObjectMetadata<T extends Props> extends Metadata {
  readonly tag: "object"
  readonly simple: IsSimple<T[keyof T]>
  readonly props: T
}

export type ObjectCodec<T extends Props> = Codec<
  HandleOptionalTypes<{ [K in keyof T]: InputOf<T[K]> }>,
  HandleOptionalTypes<{ [K in keyof T]: TypeOf<T[K]> }>,
  ObjectMetadata<T>
>

export const object = <T extends Props>(props: T): ObjectCodec<T> => {
  const keys = Object.keys(props)
  const codecs = Object.values(props)
  const simple = isEveryCodecSimple(codecs)

  return createCodec(
    (val) => {
      if (!isObject(val)) return failure(invalidObject(val))

      let ok = true
      const errors: DecodeError[] = []
      const object: any = simple ? val : { ...val }

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const codec = codecs[i]
        const value = hasOwnProperty(val, key) ? val[key] : undefined

        const result = codec.decode(value)
        if (!result.ok) {
          ok = false
          pushErrors(errors, result.errors, [key])
        } else if (!simple && ok && result.value !== undefined) {
          object[key] = result.value
        }
      }

      return ok ? success(object) : failures(errors)
    },
    simple
      ? identity
      : (object) => {
          const result = { ...object }

          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const codec = codecs[i]
            const value = codec.encode(
              hasOwnProperty(object, key) ? object[key] : undefined,
            )
            if (value !== undefined) result[key] = value
          }

          return result
        },
    { tag: "object", simple, props },
  )
}
