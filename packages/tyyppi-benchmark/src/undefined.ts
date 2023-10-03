import * as i from "io-ts"
import * as t from "tyyppi"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<undefined> = {
  name: "undefined",
  data: undefined,
  codecs: { tyyppi: t.undefined, ioTs: i.undefined, zod: z.undefined() },
}

export default suite
