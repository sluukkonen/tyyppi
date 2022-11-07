import * as t from "io-ts"
import * as n from "noema"
import * as r from "runtypes"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<undefined> = {
  name: "undefined",
  data: undefined,
  codecs: [n.undefined, t.undefined, z.undefined(), r.Undefined],
}

export default suite
