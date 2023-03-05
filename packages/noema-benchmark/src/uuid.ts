import * as crypto from "node:crypto"
import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<string> = {
  name: "uuid",
  data: crypto.randomUUID(),
  codecs: { noema: n.uuid, zod: z.string().uuid() },
}

export default suite
