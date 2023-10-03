import { exec as execCb } from "node:child_process"
import { promisify } from "node:util"

const exec = promisify(execCb)

test("should minify properly", async () => {
  const result = await exec(
    `echo 'import * as t from "tyyppi"' | esbuild --bundle --format=esm`
  )

  expect(result.stdout).toBe("")
  expect(result.stderr).toBe("")
})
