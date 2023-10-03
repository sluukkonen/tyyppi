import * as i from "io-ts"
import * as t from "tyyppi"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<number> = {
  name: "integer",
  data: 0,
  codecs: { tyyppi: t.integer, ioTs: i.Integer, zod: z.number().int() },
}

export default suite
