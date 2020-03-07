import { ICoin } from './ICoin';

export class IRebalancerPair {
    [index: string]: ICoin; 
 
    constructor(data: any) {
       Object.keys(data).forEach((key) => {
          this[key] = new ICoin();
       });
    }
 }