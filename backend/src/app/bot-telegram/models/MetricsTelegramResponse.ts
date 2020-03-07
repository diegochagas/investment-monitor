
/**
 * @typedef MetricsTelegramSumsResponse
 * @property { integer } periodTrade 
 * @property { integer } activeTrade 
 * @property { integer } gains
 * @property { integer } losses 
 * @property { integer } finishedTrades 
*/

export class MetricsTelegramSumsResponse{
    periodTrade?:number= undefined
    activeTrade?:number= undefined
    gains?:number= undefined
    losses?:number= undefined
    finishedTrades?:number= undefined
}


/**
 * @typedef MetricsTelegramChannelBalancesResponse
 * @property { string } name 
 * @property { Array.<integer> } data
 */
export class MetricsTelegramChannelBalancesResponse{
    name?:string
    data?:Array<Array<number>>

}