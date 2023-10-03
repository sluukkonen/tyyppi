import { DecodeError } from "./DecodeError.js"

export class TyyppiError<E extends DecodeError> extends Error {
  constructor(readonly message: string, readonly errors: readonly E[]) {
    super(message)
  }
}

TyyppiError.prototype.name = TyyppiError.name
