import * as n from "noema"
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
    noema: n.fromJson.map(n.string, n.number),
  },
}

export default suite
