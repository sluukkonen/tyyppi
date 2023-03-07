import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<string> = {
  name: "length",
  data: "12345",
  codecs: {
    noema: n.string.pipe(n.length, 5),
    zod: z.string().length(5),
  },
}

export default suite
