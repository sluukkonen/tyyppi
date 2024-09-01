export interface ErrorBase {
  readonly message: string
  readonly path: (string | number)[]
}
