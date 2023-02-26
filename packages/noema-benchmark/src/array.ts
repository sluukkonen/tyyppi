import * as t from "io-ts"
import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<number[]> = {
  name: "array",
  data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  codecs: [n.array(n.number), t.array(t.number), z.array(z.number())],
}

export default suite
