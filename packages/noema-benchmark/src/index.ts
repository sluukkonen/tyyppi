import assert from "assert/strict"
import * as b from "benny"
import { isLeft } from "fp-ts/lib/Either.js"
import * as t from "io-ts"
import * as n from "noema"
import * as r from "runtypes"
import * as z from "zod"
import array from "./array.js"
import object from "./object.js"
import record from "./record.js"
import string from "./string.js"
import integer from "./integer.js"
import undefined from "./undefined.js"

export interface Benchmark<T> {
  name: string
  data: T
  codecs: [n.Codec<T>, t.Type<T>, z.ZodSchema<T>, r.Runtype<T>]
}

const ioTsUnsafeParse =
  <T>(codec: t.Type<T>) =>
  (data: unknown) => {
    const either = codec.decode(data)
    if (isLeft(either)) {
      throw new Error("io-ts parse error")
    }
    return either.right
  }

function runBenchmark<T>(benchmark: Benchmark<T>) {
  const { name, data, codecs } = benchmark
  const [noema, ioTs, zod, runtypes] = codecs
  const benchmarks = [
    ["noema", noema.unsafeDecode],
    ["io-ts", ioTsUnsafeParse(ioTs)],
    ["zod", zod.parse],
    ["runtypes", runtypes.check],
  ] as const

  for (const [name, fn] of benchmarks) {
    assert.deepStrictEqual(fn(data), data, name)
  }

  return b.suite(
    name,
    ...benchmarks.map(([name, fn]) => b.add(name, () => fn(data))),
    b.cycle(),
    b.complete()
  )
}

const suites = [
  ["array", array],
  ["integer", integer],
  ["object", object],
  ["record", record],
  ["string", string],
  ["undefined", undefined],
] as [string, Benchmark<unknown>][]

for (const [name, suite] of suites) {
  if (
    process.argv.length === 2 ||
    process.argv.find((arg) => arg.includes(name))
  ) {
    await runBenchmark(suite)
  }
}
