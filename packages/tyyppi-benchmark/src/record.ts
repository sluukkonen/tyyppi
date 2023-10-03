import * as i from "io-ts"
import * as t from "tyyppi"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<Record<string, number>> = {
  name: "record",
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
  },
  codecs: {
    tyyppi: t.record(t.string, t.number),
    ioTs: i.record(i.string, i.number),
    zod: z.record(z.string(), z.number()),
  },
}

export default suite
