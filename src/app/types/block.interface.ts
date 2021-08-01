export interface BlockInterface {
  index: number,
  data: string,
  nonce: number,
  prevHash: string,
  currentHash: string,
  valid: boolean
}
