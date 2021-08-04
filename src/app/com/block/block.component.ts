import {Component, OnInit} from '@angular/core';
import {BlockInterface} from "../../types/block.interface";
import {CryptoService} from "../../ser/cryptoService/crypto.service";
import {HashFunctionEnum} from "../../types/hash-function.enum";
import {MineService} from "../../ser/mineService/mine.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BlockService} from "../../ser/blockService/block.service";
import {ConfigService} from "../../ser/configService/config.service";
import {ConfigInterface} from "../../types/config.interface";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  loading: boolean = false;
  config: ConfigInterface = this.configService.getConfig();
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
              private _snackBar: MatSnackBar,
              private configService: ConfigService) { }

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
   * Mine block - for click event.
   */
  mineAction() {
    this.loading = true;
    this.mineBlockWorker(this.blockCard);
  }

  /*mineBlock(block: BlockInterface): Observable<string> {
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
  }*/

  /**
   * Call service with mine web worker.
   *
   * @param block     Block to mine.
   */
  async mineBlockWorker(block: BlockInterface) {
    await this.mineService.mineBlock(block, value => {
      this.blockCard.timestamp = value.date;
      this.blockCard.nonce = value.nonce;
      this.blockCard.currentHash = value.hash;
      this.blockCard.valid = true;
      this.loading = false;
      console.info(`Block with ID=${this.blockCard.index} was mined and his hash is: ${this.blockCard.currentHash}`);
      this.openSnackBar(`Block with ID: ${this.blockCard.index} was mined after ${value.performance} ms.`, 'OK')
    });
  }

  /**
   * Open snackbar in this component.
   *
   * @param message     Message to show.
   * @param action      Message for action.
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }

}
