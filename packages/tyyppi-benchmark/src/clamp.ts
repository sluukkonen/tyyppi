import * as t from "tyyppi"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<number> = {
  name: "clamp",
  data: 5,
  codecs: {
    tyyppi: t.integer.pipe(t.clamp, 1, 10),
    zod: z.number().int().min(1).max(10),
  },
}

export default suite
