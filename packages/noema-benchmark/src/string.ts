import * as t from "io-ts"
import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<string> = {
  name: "string",
  data: "asdf",
  codecs: { noema: n.string, ioTs: t.string, zod: z.string() },
}

export default suite
