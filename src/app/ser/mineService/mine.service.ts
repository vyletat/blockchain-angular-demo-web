import { Injectable } from '@angular/core';
import {BlockInterface} from "../../types/block.interface";

@Injectable({
  providedIn: 'root'
})
export class MineService {

  constructor() { }

  async mineBlock(data: BlockInterface, updateBlock: (value: any) => void) {
    if (typeof Worker !== 'undefined') {
      // Create a new Worker
      const worker = new Worker(new URL('../../app.worker', import.meta.url));

      // Callback
      worker.onmessage = ({ data }) => {
        updateBlock(data);
      };

      // POST
      worker.postMessage(JSON.stringify(data));
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
}
