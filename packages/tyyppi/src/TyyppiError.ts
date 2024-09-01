import { DecodeError } from "./errors/decodeError.js"

export class TyyppiError extends Error {
  constructor(
    readonly message: string,
    readonly errors: readonly DecodeError[],
  ) {
    super(message)
  }
}

TyyppiError.prototype.name = TyyppiError.name
