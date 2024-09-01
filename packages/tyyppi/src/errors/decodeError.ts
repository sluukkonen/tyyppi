import { Custom } from "./custom.js"
import { InvalidDiscriminatedUnion } from "./invalidDiscriminatedUnion.js"
import { InvalidEnum } from "./invalidEnum.js"
import { InvalidFormat } from "./invalidFormat.js"
import { InvalidInteger } from "./invalidInteger.js"
import { InvalidLiteral } from "./invalidLiteral.js"
import { InvalidPattern } from "./invalidPattern.js"
import { InvalidType } from "./invalidType.js"
import { InvalidUnion } from "./invalidUnion.js"
import { IsInfinite } from "./isInfinite.js"
import { IsNaN } from "./isNaNError.js"
import { TooLarge } from "./tooLarge.js"
import { TooLong } from "./tooLong.js"
import { TooShort } from "./tooShort.js"
import { TooSmall } from "./tooSmall.js"

export type DecodeError =
  | Custom
  | InvalidDiscriminatedUnion
  | InvalidEnum
  | InvalidFormat
  | InvalidInteger
  | InvalidLiteral
  | InvalidPattern
  | InvalidType
  | InvalidUnion
  | IsInfinite
  | IsNaN
  | TooLarge
  | TooLong
  | TooShort
  | TooSmall
