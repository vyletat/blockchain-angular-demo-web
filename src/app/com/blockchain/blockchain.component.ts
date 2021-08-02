import { Component, OnInit } from '@angular/core';
import {BlockInterface} from "../../types/block.interface";

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {
  index: number = 1;
  loading: boolean = false;
  blockchain: BlockInterface[] =
  [
    {
      index: this.index,
      timestamp: Date.now(),
      data: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      nonce: 0,
      prevHash: '0',
      currentHash: '',
      valid: false
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  /**
   * Create new block.
   */
  addBlock(): void {
    this.index++;
    let initBlock: BlockInterface = {
      index: this.index,
      timestamp: Date.now(),
      data: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      nonce: 0,
      prevHash: '',
      currentHash: '',
      valid: false
    }
    this.blockchain.push(initBlock);
    console.info(`New block was created with ID: ${this.index}`);
  }

  /**
   * Remove block.
   */
  removeBlock(index: number): void {
    if (this.blockchain.length - 1 == index) {
      this.blockchain.pop();
      console.info(`Block with ID: ${index} was removed`)
    } else {
      console.warn(`Block cannot be deleted, because it is not the last.`)
    }
  }

  /**
   * Create new indexes after block remove.
   */
  renewIndex(): void {

  }

  inputChange(index: number) {

  }

  mineAction(index: number) {

  }

  mineBlock(block: BlockInterface) {

  }

  checkBlockchain() {

  }
}
