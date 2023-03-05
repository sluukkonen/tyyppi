import * as t from "io-ts"
import * as n from "noema"
import * as z from "zod"
import { Benchmark } from "./index.js"

const mapFromEntries = <K extends t.Any, V extends t.Any>(
  keys: K,
  values: V
) => {
  const type = new t.Type<
    Map<t.TypeOf<K>, t.TypeOf<V>>,
    [t.InputOf<K>, t.InputOf<V>][],
    [t.InputOf<K>, t.InputOf<V>][]
  >(
    "mapFromEntries",
    (v): v is Map<t.TypeOf<K>, t.TypeOf<V>> => {
      throw new Error("not implemented")
    },
    (input) => {
      return t.success(new Map(input))
    },
    (): [t.InputOf<K>, t.InputOf<V>][] => {
      throw new Error("not implemented")
    }
  )
  return t.array(t.tuple([keys, values])).pipe(type)
}

const suite: Benchmark<[string, number][], Map<string, number>> = {
  name: "fromJson.map",
  data: [
    ["0", 0],
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["10", 10],
  ],
  codecs: [
    n.fromJson.map(n.string, n.number),
    mapFromEntries(t.string, t.number),
    z
      .array(z.tuple([z.string(), z.number()]))
      .transform((entries) => new Map(entries)),
  ],
}

export default suite
