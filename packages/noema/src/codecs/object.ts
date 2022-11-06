import {
  AnyCodec,
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { hasOwnProperty, identity, pushErrors } from "../utils.js"
import { ObjectMetadata } from "../Metadata.js"
import { InvalidObject } from "../DecodeError.js"
import { failure, failures, Result, success } from "../Result.js"

type RequiredKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? never : K
}[keyof T]

type OptionalKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? K : never
}[keyof T]

type Id<T> = { [K in keyof T]: T[K] }

type HandleOptionalTypes<T> = Id<
  {
    [K in RequiredKeys<T>]: T[K]
  } & {
    [K in OptionalKeys<T>]?: Exclude<T[K], undefined>
  }
>

type ObjectCodec<T extends Record<string, AnyCodec>> = Codec<
  HandleOptionalTypes<{ [K in keyof T]: InputOf<T[K]> }>,
  HandleOptionalTypes<{ [K in keyof T]: TypeOf<T[K]> }>,
  ErrorOf<T[keyof T]> | InvalidObject,
  ObjectMetadata<T>
>

export function object<T extends Record<string, AnyCodec>>(
  props: T
): ObjectCodec<T> {
  const keys = Object.keys(props)
  const codecs = Object.values(props)
  const simple = codecs.every((codec) => codec.metadata.simple)

  return createCodec(
    (val): Result<TypeOf<T[keyof T]>, ErrorOf<T[keyof T]> | InvalidObject> => {
      if (val == null || typeof val !== "object" || Array.isArray(val))
        return failure({
          code: "invalid_object",
          actual: val,
          path: [],
        })

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

      return ok ? success(object) : failures(errors)
    },
    simple
      ? identity
      : (object: any) => {
          const result = {} as any

          for (const key in object) {
            if (hasOwnProperty(object, key)) {
              const codec = props[key]
              result[key] = codec.encode(object[key])
            }
          }

          return result
        },
    { tag: "object", simple, props }
  )
}
