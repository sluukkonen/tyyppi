import { DecodeError } from "./DecodeError.js"

export class ParseError<E extends DecodeError> extends Error {
  constructor(readonly message: string, readonly errors: readonly E[]) {
    super(message)
  }
}
