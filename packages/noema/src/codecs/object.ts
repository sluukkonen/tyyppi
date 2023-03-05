import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { invalidObject, InvalidObject } from "../DecodeError.js"
import { failure, failures, Result, success } from "../Result.js"
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

type OptionalKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? K : never
}[keyof T]

type Identity<T> = T

type Flatten<T> = Identity<{ [K in keyof T]: T[K] }>

type HandleOptionalTypes<T> = Flatten<
  {
    [K in RequiredKeys<T>]: T[K]
  } & {
    [K in OptionalKeys<T>]?: Exclude<T[K], undefined>
  }
>

export interface ObjectCodec<T extends Record<string, AnyCodec>>
  extends Codec<
    HandleOptionalTypes<{ [K in keyof T]: InputOf<T[K]> }>,
    HandleOptionalTypes<{ [K in keyof T]: TypeOf<T[K]> }>,
    ErrorOf<T[keyof T]> | InvalidObject
  > {
  readonly metadata: {
    readonly tag: "object"
    readonly simple: IsSimple<T[keyof T]>
    readonly props: T
  }
}

export const object = <T extends Record<string, AnyCodec>>(
  props: T
): ObjectCodec<T> => {
  const keys = Object.keys(props)
  const codecs = Object.values(props)
  const simple = isEveryCodecSimple(codecs)

  return createCodec(
    (val): Result<TypeOf<T[keyof T]>, ErrorOf<T[keyof T]> | InvalidObject> => {
      if (!isObject(val)) return failure(invalidObject(val))

      let ok = true
      const errors: ErrorOf<T[keyof T]>[] = []
      const object: any = {}

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const codec = codecs[i]

        const property = hasOwnProperty(val, key) ? val[key] : undefined

        const result = codec.decode(property) as ResultOf<T[keyof T]>
        if (!result.ok) {
          ok = false
          pushErrors(errors, result.errors, key)
        } else if (ok && result.value !== undefined) {
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
          const result = {} as any

          for (const key in object) {
            if (hasOwnProperty(object, key)) {
              const codec = props[key]
              if (codec) result[key] = codec.encode(object[key])
            }
          }

          return result
        },
    { tag: "object", simple, props }
  )
}
