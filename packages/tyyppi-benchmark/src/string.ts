import * as i from "io-ts"
import * as t from "tyyppi"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<string> = {
  name: "string",
  data: "asdf",
  codecs: { tyyppi: t.string, ioTs: i.string, zod: z.string() },
}

export default suite
