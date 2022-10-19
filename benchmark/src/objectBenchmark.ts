import { n, t, z, r, Benchmark } from "./index.js"

interface ComplexObject {
  string: string
  number: number
  boolean: boolean
  numberArray: number[]
  stringArray: string[]
  booleanArray: boolean[]
  stringRecord: Record<string, string>
  numberRecord: Record<string, number>
  booleanRecord: Record<string, boolean>
}

const suite: Benchmark<ComplexObject> = {
  name: "object",
  data: {
    string: "",
    number: 0,
    boolean: true,
    numberArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    stringArray: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    booleanArray: [true, true, true, true, true, true, true, true, true, true],
    stringRecord: {
      a: "1",
      b: "2",
      c: "3",
      d: "4",
      e: "5",
      f: "6",
      g: "7",
      h: "8",
      i: "9",
      j: "10",
    },
    numberRecord: {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
    },
    booleanRecord: {
      a: true,
      b: true,
      c: true,
      d: true,
      e: true,
      f: true,
      g: true,
      h: true,
      i: true,
      j: true,
    },
  },
  codecs: [
    n.object({
      string: n.string,
      number: n.number,
      boolean: n.boolean,
      stringArray: n.array(n.string),
      numberArray: n.array(n.number),
      booleanArray: n.array(n.boolean),
      stringRecord: n.record(n.string, n.string),
      numberRecord: n.record(n.string, n.number),
      booleanRecord: n.record(n.string, n.boolean),
    }),
    t.type({
      string: t.string,
      number: t.number,
      boolean: t.boolean,
      stringArray: t.array(t.string),
      numberArray: t.array(t.number),
      booleanArray: t.array(t.boolean),
      stringRecord: t.record(t.string, t.string),
      numberRecord: t.record(t.string, t.number),
      booleanRecord: t.record(t.string, t.boolean),
    }),
    z.object({
      string: z.string(),
      number: z.number(),
      boolean: z.boolean(),
      stringArray: z.array(z.string()),
      numberArray: z.array(z.number()),
      booleanArray: z.array(z.boolean()),
      stringRecord: z.record(z.string(), z.string()),
      numberRecord: z.record(z.string(), z.number()),
      booleanRecord: z.record(z.string(), z.boolean()),
    }),
    r.Record({
      string: r.String,
      number: r.Number,
      boolean: r.Boolean,
      stringArray: r.Array(r.String),
      numberArray: r.Array(r.Number),
      booleanArray: r.Array(r.Boolean),
      stringRecord: r.Dictionary(r.String, r.String),
      numberRecord: r.Dictionary(r.Number, r.String),
      booleanRecord: r.Dictionary(r.Boolean, r.String),
    }),
  ],
}

export default suite
