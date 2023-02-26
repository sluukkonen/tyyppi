import * as t from "io-ts"
import * as n from "noema"
import * as r from "runtypes"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<number> = {
  name: "integer",
  data: 0,
  codecs: [
    n.integer,
    t.Integer,
    z.number().int(),
    r.Number.withConstraint((v) => Number.isInteger(v) || "not an integer"),
  ],
}

export default suite
