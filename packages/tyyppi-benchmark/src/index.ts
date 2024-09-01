import assert from "assert/strict"
import * as b from "benny"
import { isLeft } from "fp-ts/lib/Either.js"
import * as i from "io-ts"
import * as t from "tyyppi"
import * as z from "zod"
import array from "./array.js"
import clamp from "./clamp.js"
import email from "./email.js"
import enumB from "./enum.js"
import fromJsonMap from "./fromJson.map.js"
import integer from "./integer.js"
import length from "./length.js"
import object from "./object.js"
import record from "./record.js"
import string from "./string.js"
import undefined from "./undefined.js"
import uuid from "./uuid.js"

export interface Benchmark<I, T = I> {
  name: string
  data: I
  codecs: {
    tyyppi: t.Codec<I, T>
    ioTs?: i.Type<T, I>
    zod?: z.ZodType<T, z.ZodTypeDef, I>
  }
}

const ioTsUnsafeParse =
  <T>(codec: i.Type<T>) =>
  (data: unknown) => {
    const either = codec.decode(data)
    if (isLeft(either)) {
      throw new Error("io-ts parse error")
    }
    return either.right
  }

function runBenchmark<T>(benchmark: Benchmark<T>) {
  const { name, data, codecs } = benchmark
  const { tyyppi, ioTs, zod } = codecs
  const benchmarks: [string, (val: unknown) => unknown][] = [
    ["tyyppi", tyyppi.decodeOrThrow],
  ]
  // eslint-disable-next-line @typescript-eslint/unbound-method
  if (zod) benchmarks.push(["zod", zod.parse])
  if (ioTs) benchmarks.push(["io-ts", ioTsUnsafeParse(ioTs)])

  for (const [name, fn] of benchmarks) {
    if (tyyppi.meta.simple) {
      assert.deepStrictEqual(fn(data), data, name)
    }
  }

  return b.suite(
    name,
    ...benchmarks.map(([name, fn]) => b.add(name, () => fn(data))),
    b.cycle(),
    b.complete(),
  )
}

const suites = [
  ["array", array],
  ["clamp", clamp],
  ["email", email],
  ["enum", enumB],
  ["integer", integer],
  ["fromJson.map", fromJsonMap],
  ["length", length],
  ["object", object],
  ["record", record],
  ["string", string],
  ["undefined", undefined],
  ["uuid", uuid],
] as [string, Benchmark<unknown>][]

for (const [name, suite] of suites) {
  if (
    process.argv.length === 2 ||
    process.argv.find((arg) => name.includes(arg))
  ) {
    await runBenchmark(suite)
  }
}
