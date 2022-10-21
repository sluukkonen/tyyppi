import { n, t, z, r, Benchmark } from "./index.js"

const suite: Benchmark<string> = {
  name: "string",
  data: "asdf",
  codecs: [n.string, t.string, z.string(), r.String],
}

export default suite
