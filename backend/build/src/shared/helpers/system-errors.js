"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemErrors = {
    // Strategy errors //
    STRATEGY_DUPLICATE_CONFIG: { code: '10000', message: 'Já existe uma Strategy com os mesmos valores parametrizados.' },
    STRATEGY_USED_STRATEGY: { code: '10001', message: 'Esta Strategy está ativa em outra Instância.' },
    STRATEGY_MARKET_BASE_PRICE_REQUIRED: {
        code: '10002',
        message: "Quando o campo \"midRefPrice\" for 'MARKET', os par\u00E2metros de MarketBasePrice s\u00E3o obrigat\u00F3rios."
    },
    STRATEGY_EXCHANGE_NOTFOUND: { code: '10003', message: 'Exchange não encontrada' },
    //Others Errors ...//
    //Mongoose errors
    Mongoose: {
        Errors: [
            { code: '30000', message: 'Erro no mongoose.' },
            { code: '11000', message: 'Item already exist.' },
        ]
    },
    INSTANCE_STATUS_ERROR: {
        code: '20000',
        message: 'Você não pode alterar o status da Instancia quando o mesmo encontra-se OFFLINE ou PENDENTE'
    },
    INSTANCE_DUPLICITY_STRATEGY: { code: '20001', message: 'Está strategy está sendo executada em outra instância' }
};
//# sourceMappingURL=system-errors.js.map