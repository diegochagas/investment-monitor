import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {
    ContextSnapshots,
    ContextSnapshotsSchema,
    IBalanceFormatted,
    IBalanceResponse, IValueByExchange
} from "../models/ContentSnapshots";
import {SymbolValue} from "../models/SymbolValue";
import {GlobalRates} from "../models/GlobalRates";

export class ServiceBalance {

    static getBalanceDifference(startDate, endDate, mainCurrency = "BTC") {
        if (!startDate || !endDate) {
            throw new ApplicationResponse(400, {}, 'Error to get balance, startDate and endDate are required');
        }
        const lastBalance = ContextSnapshotsSchema.findOne({'timeStamp' : {'$lt': endDate}}).sort({id: -1});
        const initialBalance = ContextSnapshotsSchema.findOne({'timeStamp' : {'$gt': startDate}});

        return Promise.all([lastBalance, initialBalance]).then( ([final, initial]) => {
            const response = {
                initial: this.formatBalance(initial, mainCurrency),
                final: this.formatBalance(final, mainCurrency)
            };
            return new ApplicationResponse<IBalanceResponse>(200, response);
        }).catch(e => {
            if(e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {},'Error to get balance')
        });
    }

    static async getCurrencies() {
        try {
            const lastContext = await ContextSnapshotsSchema.findOne({}).sort({id: -1});
            if(lastContext) {
                const response = lastContext.globalRates ? Object.keys(lastContext.globalRates['BTC']) : [];
                return new ApplicationResponse<string[]>(200, [...response, 'BTC'] );
            }
            return new ApplicationResponse(200, []);
        } catch(e) {
            if(e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {},'Error to get currency')
        }
    }

    private static formatBalance(rawFormat: ContextSnapshots | null, mainCurrency: string): IBalanceFormatted {
        if(rawFormat === null) {
            return {
                mainCurrency: mainCurrency,
                totalValue: 0,
                timeStamp: Date.now(),
                valuesByExchange: []
            };
        }

        const valuesByExchange = rawFormat.tradingContexts.map(context => {
            return context.exchanges && context.exchanges.map(
                exchange => this.getLastKnownBalance(rawFormat, exchange, mainCurrency)
            )
        })[0];

        const totalValue = valuesByExchange ? valuesByExchange.reduce(
            (sum, value) => sum + (value.totalValue ? value.totalValue : 0), 0
        ) : 0;

        return {
            mainCurrency: mainCurrency,
            totalValue,
            timeStamp: rawFormat.timeStamp ? rawFormat.timeStamp : 0,
            valuesByExchange: valuesByExchange ? valuesByExchange : []
        }
    }

    private static getLastKnownBalance(rawFormat, exchange, mainCurrency): IValueByExchange {
        const name = exchange.id ? exchange.id : '';

        if(!exchange.wallets || exchange.wallets.length <= 0) {
            return {
                totalValue: 0,
                name,
                lastKnownBalances: {}
            }
        }

        // @todo caso existe mais de uma wallet será necessário fazer o merge
        let lastKnownBalance = {
            totalValue: 0
        };
        if(exchange.wallets && rawFormat.globalRates && rawFormat.globalRates['BTC']) {
            lastKnownBalance = exchange.wallets.map( wallet =>
                this.convertValueToBtc(wallet.lastKnownBalance, rawFormat.globalRates)
            )[0];

            if(mainCurrency !== 'BTC') {
                lastKnownBalance = this.convertValueTo(lastKnownBalance, rawFormat.globalRates['BTC'], mainCurrency);
            }
        }
        return {
            name,
            ...lastKnownBalance
        }
    }

    private static convertValueToBtc(knownBalance: SymbolValue, rates: GlobalRates | undefined) {
        let convertedValues = {};
        let totalValue = 0;
        const mainCurrency = 'BTC';

        Object.entries(knownBalance).forEach(([key, value]) => {
            if(key === mainCurrency) {
                convertedValues[key] = value;
                totalValue += convertedValues[key];
            } else if(rates !== undefined && rates[mainCurrency] && rates[mainCurrency][key]) {
                const rate = rates[mainCurrency][key];
                convertedValues[key] = value * rate;
                totalValue += convertedValues[key];
            }
        });
        return {
            totalValue: totalValue,
            lastKnownBalances: convertedValues
        };
    }

    private static convertValueTo(balance, rates, mainCurrency) {
        let convertedValues = {};
        Object.entries(balance.lastKnownBalances).forEach(([key, value]) => {
            convertedValues[key] = <number>value / rates[mainCurrency];
        });
        return {
            totalValue: balance.totalValue / rates[mainCurrency],
            lastKnownBalance: convertedValues
        };
    }
}