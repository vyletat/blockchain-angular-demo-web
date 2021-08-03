import { Injectable } from '@angular/core';
import {BlockInterface} from "../../types/block.interface";

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor() { }

  /**
   * Return string for data hash.
   */
  getDataFromBlock(block: BlockInterface): string {
    return `${block.data}${block.nonce}${block.prevHash}${block.timestamp}`;
  }


}
