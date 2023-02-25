export type Literal =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | symbol
  | null

export type Ordered = number | bigint | string | Date | boolean

export interface HasLength {
  length: number
}
