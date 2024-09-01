import { SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidFormat } from "../errors/index.js"
import { refinement } from "./refinement.js"
import { string } from "./string.js"

// https://html.spec.whatwg.org/#e-mail-state-(type=email)
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

interface EmailMetadata extends SimpleMetadata {
  readonly tag: "email"
}

export type EmailCodec = SimpleCodec<string, EmailMetadata>

export const email: EmailCodec = refinement(
  string,
  (s) => emailRegexp.test(s),
  () => invalidFormat({ format: "email" }),
  { tag: "email" },
)
