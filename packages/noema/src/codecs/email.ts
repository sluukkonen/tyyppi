import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import {
  invalidEmail,
  InvalidEmail,
  invalidString,
  InvalidString,
} from "../DecodeError.js"
import { failure, Result, success } from "../Result.js"
import { isString } from "../utils.js"

// https://html.spec.whatwg.org/#e-mail-state-(type=email)
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export interface EmailCodec
  extends SimpleCodec<string, InvalidString | InvalidEmail> {
  readonly metadata: {
    readonly tag: "email"
    readonly simple: true
  }
}

export const email: EmailCodec = createSimpleCodec(
  (val): Result<string, InvalidString | InvalidEmail> =>
    isString(val)
      ? emailRegexp.test(val)
        ? success(val)
        : failure(invalidEmail())
      : failure(invalidString(val)),
  {
    tag: "email",
    simple: true,
  }
)
