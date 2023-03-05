import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import {
  InvalidString,
  invalidString,
  InvalidUuid,
  invalidUuid,
} from "../DecodeError.js"
import { failure, Result, success } from "../Result.js"
import { isString } from "../utils.js"

// https://github.com/uuidjs/uuid/blob/main/src/regex.js
// Supports RFC4122 version 1, 2, 3, 4 and 5 UUIDs
const uuidRegexp =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i

export interface UuidCodec
  extends SimpleCodec<string, InvalidString | InvalidUuid> {
  readonly metadata: {
    readonly tag: "uuid"
    readonly simple: true
  }
}

export const uuid: UuidCodec = createSimpleCodec(
  (val): Result<string, InvalidString | InvalidUuid> =>
    isString(val)
      ? uuidRegexp.test(val)
        ? success(val)
        : failure(invalidUuid())
      : failure(invalidString(val)),
  {
    tag: "uuid",
    simple: true,
  }
)
