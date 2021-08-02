export interface BlockInterface {
  index: number,
  timestamp?: number,
  data: string,
  nonce: number,
  prevHash: string,
  currentHash: string,
  valid: boolean
}
