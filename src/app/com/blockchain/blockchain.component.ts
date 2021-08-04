import { Component, OnInit } from '@angular/core';
import {BlockInterface} from "../../types/block.interface";
import {HashFunctionEnum} from "../../types/hash-function.enum";
import {CryptoService} from "../../ser/cryptoService/crypto.service";
import {MineService} from "../../ser/mineService/mine.service";
import {BlockService} from "../../ser/blockService/block.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfigInterface} from "../../types/config.interface";
import {ConfigService} from "../../ser/configService/config.service";

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {
  index: number = 1;
  loading: boolean = false;
  genesisBlockPrevHash: string = '000000000000000000000000000000000000000000000000000000000000000000000000';
  snackBarDuration: number = 3000;
  config: ConfigInterface = this.configService.getConfig();
  blockchain: BlockInterface[] =
  [
    {
      index: this.index,
      timestamp: Date.now(),
      data: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      nonce: 0,
      prevHash: this.genesisBlockPrevHash,
      currentHash: '',
      valid: false
    }
  ];

  constructor(private cryptoService: CryptoService,
              private mineService: MineService,
              private blockService: BlockService,
              private _snackBar: MatSnackBar,
              private configService: ConfigService) { }

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
    this.renewIndex();
    console.info(`New block was created with ID: ${this.index}`);
  }

  /**
   * Remove block.
   *
   * @param index       Block index to remove.
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
    let newIndex = 1;
    this.blockchain.forEach(block => {
      block.index = newIndex++;
    });
    this.index = newIndex - 1;
  }

  /**
   * Trigger every time when is something is changed in block.
   *
   * @param index       Block index.
   */
  inputChange(index: number) {
    this.blockchain[index].timestamp = Date.now();
    this.blockchain[index].currentHash = this.cryptoService.hashDataWithSelectedFunction(this.blockService.getDataFromBlock(this.blockchain[index]), HashFunctionEnum.sha2);
    this.blockchain[index].valid = false;
    this.checkBlockchain();
    console.info(`Blocks input with ID: ${this.blockchain[index].index} was changed and is now INVALID`);
  }

  /**
   * Mine block - for click event.
   *
   * @param index       Block index.
   */
  mineAction(index: number) {
    this.loading = true;
    this.mineBlockWorker(index);
  }

  /**
   * Get previous block hash.
   *
   * @param index       Block index.
   */
  getPreviousHash(index: number): string {
    let prevHash: string;
    if (index == 0) {
      prevHash = this.genesisBlockPrevHash;
    } else {
      prevHash = this.blockchain[index - 1].currentHash;
    }
    return prevHash;
  }

  /**
   * Call service with mine web worker.
   *
   * @param index       Block index.
   */
  async mineBlockWorker(index: number) {
    await this.mineService.mineBlock(this.blockchain[index], value => {
      this.blockchain[index].timestamp = value.date;
      this.blockchain[index].nonce = value.nonce;
      this.blockchain[index].prevHash = this.getPreviousHash(index);
      this.blockchain[index].currentHash = value.hash;
      this.blockchain[index].valid = this.prevIsValid(index);
      this.loading = false;
      console.info(`Block with ID: ${this.blockchain[index].index} was mined with hash: ${this.blockchain[index].currentHash} and is valid: ${this.blockchain[index].valid}`);
      this.openSnackBar(`Block with ID: ${this.blockchain[index].index} was mined after ${value.performance} ms.`, 'OK')
    });
  }

  /**
   * Check all blockchain, if previous block hash from current is valid.
   */
  checkBlockchain() {
    for (let i = 0; i < this.blockchain.length; i++) {
      if (i == 0) {
        continue;
      } else {
        if (this.blockchain[i - 1].currentHash !== this.blockchain[i].prevHash) {
          for (let j = i; j < this.blockchain.length; j++) {
            console.log(j);
            this.blockchain[j].valid = false;
          }
          break;
        }
      }
    }
  }

  /**
   * Check if previous valid attribute block is valid.
   *
   * @param index       Block index.
   */
  prevIsValid(index: number): boolean {
    let valid: boolean = true;
    if (index == 0) {
      valid = true;
    } else {
      if (!this.blockchain[index - 1].valid) {
        valid = false;
      }
    }
    return valid;
  }

  /**
   * Open snackbar in this component.
   *
   * @param message     Message to show.
   * @param action      Message for action.
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: this.snackBarDuration});
  }
}
