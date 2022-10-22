import { n, t, z, r, Benchmark } from "./index.js"

interface SimpleObject {
  string: string
  number: number
  boolean: boolean
  array: number[],
}

const suite: Benchmark<SimpleObject> = {
  name: "object",
  data: {
    string: "",
    number: 0,
    boolean: true,
    array: [1, 2, 3]  },
  codecs: [
    n.object({
      string: n.string,
      number: n.number,
      boolean: n.boolean,
      array: n.array(n.number),
    }),
    t.type({
      string: t.string,
      number: t.number,
      boolean: t.boolean,
      array: t.array(t.number),
    }),
    z.object({
      string: z.string(),
      number: z.number(),
      boolean: z.boolean(),
      array: z.array(z.number()),
    }),
    r.Record({
      string: r.String,
      number: r.Number,
      boolean: r.Boolean,
      array: r.Array(r.Number),
    }),
  ],
}

export default suite
