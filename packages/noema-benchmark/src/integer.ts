import * as t from "io-ts"
import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<number> = {
  name: "integer",
  data: 0,
  codecs: { noema: n.integer, ioTs: t.Integer, zod: z.number().int() },
}

export default suite
