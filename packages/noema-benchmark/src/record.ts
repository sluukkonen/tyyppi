import * as t from "io-ts"
import * as n from "noema"
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
  codecs: [
    n.record(n.string, n.number),
    t.record(t.string, t.number),
    z.record(z.string(), z.number()),
  ],
}

export default suite
