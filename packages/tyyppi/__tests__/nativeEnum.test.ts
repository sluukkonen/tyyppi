import { nativeEnum } from "../src/index.js"
import { expectParseFailure, expectParseSuccess } from "./helpers.js"

enum StringEnum {
  ONE = "ONE",
  TWO = "Two",
}

enum NumberEnum {
  ONE = 1,
  TWO = 2,
}

enum MixedEnum {
  ONE = "One",
  TWO = 2,
}

const ConstObject = {
  ONE: "ONE",
  TWO: 2n,
} as const

test("supports string enums", () => {
  expectParseSuccess(nativeEnum(StringEnum), StringEnum.ONE)
  expectParseSuccess(nativeEnum(StringEnum), StringEnum.TWO)
  expectParseFailure(nativeEnum(StringEnum), "TWO")
})

test("supports numeric enums", () => {
  expectParseSuccess(nativeEnum(NumberEnum), NumberEnum.ONE)
  expectParseSuccess(nativeEnum(NumberEnum), NumberEnum.TWO)
  expectParseFailure(nativeEnum(NumberEnum), "ONE")
  expectParseFailure(nativeEnum(NumberEnum), "TWO")
})

test("supports mixed enums", () => {
  expectParseSuccess(nativeEnum(MixedEnum), MixedEnum.ONE)
  expectParseSuccess(nativeEnum(MixedEnum), MixedEnum.TWO)
  expectParseFailure(nativeEnum(MixedEnum), "ONE")
  expectParseFailure(nativeEnum(MixedEnum), "TWO")
})

test("supports const objects", () => {
  expectParseSuccess(nativeEnum(ConstObject), ConstObject.ONE)
  expectParseSuccess(nativeEnum(ConstObject), ConstObject.TWO)
  expectParseFailure(nativeEnum(ConstObject), "TWO")
})
