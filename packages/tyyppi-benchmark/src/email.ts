import * as t from "tyyppi"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<string> = {
  name: "email",
  data: "example@example.com",
  codecs: { tyyppi: t.email, zod: z.string().email() },
}

export default suite
