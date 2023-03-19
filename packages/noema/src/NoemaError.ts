import { DecodeError } from "./DecodeError.js"

export class NoemaError<E extends DecodeError> extends Error {
  constructor(readonly message: string, readonly errors: readonly E[]) {
    super(message)
  }
}

NoemaError.prototype.name = NoemaError.name
