import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HashInterface} from 'src/app/types/hash.interface';
import {CryptoService} from "../../ser/cryptoService/crypto.service";
import {HashFunctionEnum} from "../../types/hash-function.enum";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";

@Component({
  selector: 'app-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.css']
})
export class HashComponent implements OnInit {
  @Input() data = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
  @Input() hashFunction = HashFunctionEnum.md5;
  hashCard: HashInterface = {
    data: this.data,
    hash: this.cryptoSer.hashDataWithSelectedFunction(this.data, this.hashFunction)
  };

  constructor(
    private cryptoSer: CryptoService
  ) {}

  ngOnInit(): void {}

  dataChanged() {
    this.hashCard.data = this.data
    this.hashCard.hash = this.cryptoSer.hashDataWithSelectedFunction(this.hashCard.data, this.hashFunction);
    console.info(`Data hash with hash function (${this.hashFunction}) is: ${this.hashCard.hash}`);
  }

  /**
   *
   */
  getHasFunctions(): Array<string> {
    return Object.values(HashFunctionEnum);
  }

}
