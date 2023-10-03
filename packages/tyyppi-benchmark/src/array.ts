import * as i from "io-ts"
import * as t from "tyyppi"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<number[]> = {
  name: "array",
  data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  codecs: {
    tyyppi: t.array(t.number),
    ioTs: i.array(i.number),
    zod: z.array(z.number()),
  },
}

export default suite
