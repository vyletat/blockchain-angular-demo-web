import {HashFunctionEnum} from "./hash-function.enum";

export interface ConfigInterface {
  hashFunction: HashFunctionEnum,
  difficulty: number
}
