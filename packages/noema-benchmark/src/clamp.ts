import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<number> = {
  name: "clamp",
  data: 5,
  codecs: {
    noema: n.integer.pipe(n.clamp, 1, 10),
    zod: z.number().int().min(1).max(10),
  },
}

export default suite
