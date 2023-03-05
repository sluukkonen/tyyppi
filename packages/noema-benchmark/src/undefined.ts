import * as t from "io-ts"
import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<undefined> = {
  name: "undefined",
  data: undefined,
  codecs: { noema: n.undefined, ioTs: t.undefined, zod: z.undefined() },
}

export default suite
