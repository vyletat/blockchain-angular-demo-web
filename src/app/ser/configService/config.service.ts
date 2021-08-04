import {Injectable} from '@angular/core';
import {ConfigInterface} from "../../types/config.interface";
import {HashFunctionEnum} from "../../types/hash-function.enum";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly configId = 'config';

  constructor() {
  }

  /**
   *
   *
   * @param config
   */
  setConfig(config: ConfigInterface): void {
    localStorage.setItem(this.configId, JSON.stringify(config));
  }

  /**
   *
   */
  setDefaultConfig(): void {
    this.setConfig(this.getDefaultConfig());
  }

  /**
   *
   */
  getConfig(): ConfigInterface {
    return JSON.parse(localStorage.getItem(this.configId) || JSON.stringify(this.getDefaultConfig()));
  }

  /**
   *
   */
  removeConfig(): void {
    localStorage.removeItem(this.configId);
  }

  /**
   * Return default config.
   */
  getDefaultConfig(): ConfigInterface {
    return {
      hashFunction: HashFunctionEnum.sha2,
      difficulty: 3
    }
  }
}
