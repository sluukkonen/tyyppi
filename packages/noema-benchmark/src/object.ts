import * as t from "io-ts"
import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

interface SimpleObject {
  string: string
  number: number
  boolean: boolean
  array: number[]
}

const suite: Benchmark<SimpleObject> = {
  name: "object",
  data: {
    string: "",
    number: 0,
    boolean: true,
    array: [1, 2, 3],
  },
  codecs: {
    noema: n.object({
      string: n.string,
      number: n.number,
      boolean: n.boolean,
      array: n.array(n.number),
    }),
    ioTs: t.type({
      string: t.string,
      number: t.number,
      boolean: t.boolean,
      array: t.array(t.number),
    }),
    zod: z.object({
      string: z.string(),
      number: z.number(),
      boolean: z.boolean(),
      array: z.array(z.number()),
    }),
  },
}

export default suite
