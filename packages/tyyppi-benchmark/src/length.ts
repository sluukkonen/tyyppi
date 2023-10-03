import * as t from "tyyppi"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<string> = {
  name: "length",
  data: "12345",
  codecs: {
    tyyppi: t.string.pipe(t.length, 5),
    zod: z.string().length(5),
  },
}

export default suite
