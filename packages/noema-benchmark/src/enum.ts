import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<string> = {
  name: "enum",
  data: "foo",
  codecs: { noema: n.enum("foo", "bar"), zod: z.enum(["foo", "bar"]) },
}

export default suite
