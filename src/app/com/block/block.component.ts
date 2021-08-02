import {Component, OnInit} from '@angular/core';
import {BlockInterface} from "../../types/block.interface";
import {CryptoService} from "../../ser/cryptoService/crypto.service";
import {HashFunctionEnum} from "../../types/hash-function.enum";
import {Observable} from "rxjs";
import {MineService} from "../../ser/mineService/mine.service";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  difficulty = 4;
  loading = false;
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
              private mineService: MineService) { }

  ngOnInit(): void {
    this.blockCard.currentHash = this.cryptoService.hashDataWithSelectedFunction(this.getDataFromBlock(this.blockCard), HashFunctionEnum.sha2);
  }

  inputChange() {

  }

  mineAction() {
    this.loading = true;
    this.mineBlockWorker(this.blockCard)
    this.loading = false;
  }

  getDataFromBlock(block: BlockInterface): string {
    return `${block.data}${block.nonce}${block.prevHash}${block.timestamp}`
  }

  mineBlock(block: BlockInterface): Observable<string> {
    return new Observable<string>(subscriber => {
      block.nonce = 0;
      let hash;
      do {
        block.nonce++;
        block.timestamp = Date.now();
        hash = this.cryptoService.hashDataWithSelectedFunction(this.getDataFromBlock(block), HashFunctionEnum.sha2);
      } while (hash.substring(0, this.difficulty) !== '0'.repeat(this.difficulty));
      subscriber.next(hash);
      subscriber.complete();
    });
  }

  async mineBlockWorker(block: BlockInterface) {
    await this.mineService.mineBlock(block, value => {
      this.blockCard.timestamp = value.date;
      this.blockCard.nonce = value.nonce;
      this.blockCard.currentHash = value.hash;
    });
  }

}
