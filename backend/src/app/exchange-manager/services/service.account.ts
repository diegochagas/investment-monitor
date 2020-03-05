import * as manager from "bitfolio-exchange-manager";
import {ExchangeManager} from "../lib/ExchangeManager";

export class ServiceAccount {
    private instanceManager: manager.BitfolioExchangeManager;

    constructor() {
        this.instanceManager = ExchangeManager.getInstance().getClient();
    }

    async accountBalance(accountBalance: manager.IAccountBalanceRequest): Promise<manager.IAccountBalance> {
        try {
            return await this.instanceManager.accountBalance(accountBalance)
        } catch (e) {
            throw e
        }
    }
}
