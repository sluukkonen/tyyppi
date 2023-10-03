import * as crypto from "node:crypto"
import * as t from "tyyppi"
import * as z from "zod"
import { Benchmark } from "./index.js"

const suite: Benchmark<string> = {
  name: "uuid",
  data: crypto.randomUUID(),
  codecs: { tyyppi: t.uuid, zod: z.string().uuid() },
}

export default suite
