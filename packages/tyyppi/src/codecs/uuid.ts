import { SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidFormat } from "../errors/index.js"
import { refinement } from "./refinement.js"
import { string } from "./string.js"

// https://github.com/uuidjs/uuid/blob/main/src/regex.js
// Supports RFC4122 version 1, 2, 3, 4 and 5 UUIDs
const uuidRegexp =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i

interface UuidMetadata extends SimpleMetadata {
  readonly tag: "uuid"
}
export type UuidCodec = SimpleCodec<string, UuidMetadata>

export const uuid: UuidCodec = refinement(
  string,
  (s) => uuidRegexp.test(s),
  () => invalidFormat({ format: "uuid" }),
  { tag: "uuid" },
)
