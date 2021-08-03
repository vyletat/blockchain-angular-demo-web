import {Component, OnInit} from '@angular/core';
import {BlockInterface} from "../../types/block.interface";
import {CryptoService} from "../../ser/cryptoService/crypto.service";
import {HashFunctionEnum} from "../../types/hash-function.enum";
import {Observable} from "rxjs";
import {MineService} from "../../ser/mineService/mine.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BlockService} from "../../ser/blockService/block.service";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  difficulty: number = 4;
  loading: boolean = false;
  blockCard: BlockInterface =  {
    index: 1,
    timestamp: Date.now(),
    data: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    nonce: 0,
    prevHash: '0',
    currentHash: '',
    valid: false
  }

  constructor(private cryptoService: CryptoService,
              private mineService: MineService,
              private blockService: BlockService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.blockCard.currentHash = this.cryptoService.hashDataWithSelectedFunction(this.blockService.getDataFromBlock(this.blockCard), HashFunctionEnum.sha2);
  }

  /**
   * If some input is changed, block is invalid and hash is changed.
   */
  inputChange() {
    this.blockCard.valid = false;
    this.blockCard.timestamp = Date.now();
    this.blockCard.currentHash = this.cryptoService.hashDataWithSelectedFunction(this.blockService.getDataFromBlock(this.blockCard), HashFunctionEnum.sha2);
    console.info(`Blocks input with ID=${this.blockCard.index} was changed and is now INVALID`);
  }

  /**
   * For click event.
   */
  mineAction() {
    this.loading = true;
    this.mineBlockWorker(this.blockCard);
  }

  mineBlock(block: BlockInterface): Observable<string> {
    return new Observable<string>(subscriber => {
      block.nonce = 0;
      let hash;
      do {
        block.nonce++;
        block.timestamp = Date.now();
        hash = this.cryptoService.hashDataWithSelectedFunction(this.blockService.getDataFromBlock(block), HashFunctionEnum.sha2);
      } while (hash.substring(0, this.difficulty) !== '0'.repeat(this.difficulty));
      subscriber.next(hash);
      subscriber.complete();
    });
  }

  /**
   * Call service with mine web worker.
   */
  async mineBlockWorker(block: BlockInterface) {
    await this.mineService.mineBlock(block, value => {
      this.blockCard.timestamp = value.date;
      this.blockCard.nonce = value.nonce;
      this.blockCard.currentHash = value.hash;
      this.blockCard.valid = true;
      this.loading = false;
      console.info(`Block with ID=${this.blockCard.index} was mined and his hash is: ${this.blockCard.currentHash}`);
      this.openSnackBar(`Block with ID=${this.blockCard.index} was mined.`, 'OK')
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }

}
