import * as manager from 'bitfolio-exchange-manager';
export class ExchangeManager {

    private readonly client: manager.BitfolioExchangeManager;
    private static instance: ExchangeManager;

    private constructor() {
        this.client = new manager.BitfolioExchangeManager({
            secretManager: {
                region: 'us-west-2'
            }
        });
    }

    static getInstance() {
        if(!ExchangeManager.instance)
            ExchangeManager.instance = new ExchangeManager();
        return ExchangeManager.instance;
    }

    public getClient(): manager.BitfolioExchangeManager {
        return this.client;
    }
}
