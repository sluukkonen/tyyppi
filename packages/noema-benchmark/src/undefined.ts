import * as t from "io-ts"
import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<undefined> = {
  name: "undefined",
  data: undefined,
  codecs: [n.undefined, t.undefined, z.undefined()],
}

export default suite
