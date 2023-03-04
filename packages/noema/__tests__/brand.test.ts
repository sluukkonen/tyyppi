import { brand, integer, TypeOf } from "../src/index.js"

const Integer = brand(integer, "Integer")

test("should return the wrapped codec", () => {
  expect(Integer).toBe(integer)
})

test("a regular number should not be assignable to the branded type", () => {
  type Integer = TypeOf<typeof Integer>
  // @ts-expect-error A regular number should be not assignable to the branded type
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const int: Integer = 0
})
