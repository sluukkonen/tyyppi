import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  Metadata,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { invalidObject, InvalidObject } from "../DecodeError.js"
import { failure, failures, success } from "../Result.js"
import {
  hasOwnProperty,
  identity,
  isEveryCodecSimple,
  isObject,
  pushErrors,
} from "../utils.js"
import { NonEmptyArray } from "./nonEmptyArray.js"

type RequiredKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? never : K
}[keyof T]

type Identity<T> = T

type Flatten<T> = Identity<{ [K in keyof T]: T[K] }>

type HandleOptionalTypes<T> = Flatten<
  {
    [K in RequiredKeys<T>]: T[K]
  } & {
    [K in Exclude<keyof T, RequiredKeys<T>>]?: Exclude<T[K], undefined>
  }
>

interface ObjectMetadata<T extends Record<string, AnyCodec>> extends Metadata {
  readonly tag: "object"
  readonly simple: IsSimple<T[keyof T]>
  readonly props: T
}

export type ObjectCodec<T extends Record<string, AnyCodec>> = Codec<
  HandleOptionalTypes<{ [K in keyof T]: InputOf<T[K]> }>,
  HandleOptionalTypes<{ [K in keyof T]: TypeOf<T[K]> }>,
  ErrorOf<T[keyof T]> | InvalidObject,
  ObjectMetadata<T>
>

export const object = <T extends Record<string, AnyCodec>>(
  props: T
): ObjectCodec<T> => {
  const keys = Object.keys(props)
  const codecs = Object.values(props)
  const simple = isEveryCodecSimple(codecs)

  return createCodec(
    (val) => {
      if (!isObject(val)) return failure(invalidObject(val))

      let ok = true
      const errors: ErrorOf<T[keyof T]>[] = []
      const object: any = simple ? val : { ...val }

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const codec = codecs[i]
        const value = hasOwnProperty(val, key) ? val[key] : undefined

        const result = codec.decode(value) as ResultOf<T[keyof T]>
        if (!result.ok) {
          ok = false
          pushErrors(errors, result.errors, [key])
        } else if (!simple && ok && result.value !== undefined) {
          object[key] = result.value
        }
      }

      return ok
        ? success(object)
        : failures(errors as unknown as NonEmptyArray<ErrorOf<T[keyof T]>>)
    },
    simple
      ? identity
      : (object) => {
          const result = { ...object } as any

          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const codec = codecs[i]
            const value = codec.encode(
              hasOwnProperty(object, key) ? object[key] : undefined
            )
            if (value !== undefined) result[key] = value
          }

          return result
        },
    { tag: "object", simple, props }
  )
}
