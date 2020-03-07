import { ICoin } from './ICoin';
import { IRebalancerPair } from './IRebalancerPair';

export class IRebalancer  {
   [index: string]: IRebalancerPair | undefined;

   constructor(data: any) {
      Object.keys(data).forEach((key) => {
         this[key] = new IRebalancerPair(data);
      });
   }
}
