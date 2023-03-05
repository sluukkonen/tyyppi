import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<string> = {
  name: "email",
  data: "example@example.com",
  codecs: { noema: n.email, zod: z.string().email() },
}

export default suite
