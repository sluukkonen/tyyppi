import * as t from "tyyppi"
import { Benchmark } from "./index.js"

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
  codecs: {
    tyyppi: t.fromJson.map(t.string, t.number),
  },
}

export default suite
