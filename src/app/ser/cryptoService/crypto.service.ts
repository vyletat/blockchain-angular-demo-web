import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {HashFunctionEnum} from "../../types/hash-function.enum";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  /**
   * Hash data with selected hash function.
   *
   * @param data              Data to hash.
   * @param hashFunction      hash function.
   */
  hashDataWithSelectedFunction(data: string, hashFunction: HashFunctionEnum): string {
    switch (hashFunction) {
      case HashFunctionEnum.md5:
        return CryptoJS.MD5(data).toString();
      case HashFunctionEnum.sha1:
        return CryptoJS.SHA1(data).toString();
      case HashFunctionEnum.sha2:
        return CryptoJS.SHA256(data).toString();
      case HashFunctionEnum.sha3:
        return CryptoJS.SHA3(data).toString();
      case HashFunctionEnum.ripemd160:
        return CryptoJS.RIPEMD160(data).toString();
    }
  }
}
