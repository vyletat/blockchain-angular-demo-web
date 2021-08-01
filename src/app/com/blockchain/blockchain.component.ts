import { Component, OnInit } from '@angular/core';
import {BlockInterface} from "../../types/block.interface";

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {
  index: number = 1;
  blockchain: BlockInterface[] =
  [
    {
      index: this.index,
      data: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      nonce: 0,
      prevHash: '',
      currentHash: '',
      valid: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addBlock(): void {
    this.index++;
    let initBlock: BlockInterface = {
      index: this.index,
      data: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      nonce: 0,
      prevHash: '',
      currentHash: '',
      valid: false
    }
    this.blockchain.push(initBlock);
    console.info(`New block was created with ID: ${this.index}`);
  }

  removeBlock(index: number): void {
    if (this.blockchain.length - 1 == index) {
      this.blockchain.pop();
      console.info(`Block with ID: ${index} was removed`)
    } else {
      console.warn(`Block cannot be deleted, because it is not the last.`)
    }
  }

  dataHash() {

  }

  findNonceHash() {

  }

  checkBlockchain() {

  }

}
