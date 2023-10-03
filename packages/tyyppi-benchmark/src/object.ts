import * as i from "io-ts"
import * as t from "tyyppi"
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
    tyyppi: t.object({
      string: t.string,
      number: t.number,
      boolean: t.boolean,
      array: t.array(t.number),
    }),
    ioTs: i.type({
      string: i.string,
      number: i.number,
      boolean: i.boolean,
      array: i.array(i.number),
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
