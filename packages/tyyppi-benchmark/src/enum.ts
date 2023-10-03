import * as t from "tyyppi"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<string> = {
  name: "enum",
  data: "foo",
  codecs: { tyyppi: t.enum("foo", "bar"), zod: z.enum(["foo", "bar"]) },
}

export default suite
