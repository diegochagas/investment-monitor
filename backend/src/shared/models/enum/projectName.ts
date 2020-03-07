/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

export enum Project {
    GARCH = 'GARCH',
    TELEGRAM = 'TELEGRAM',
    MARKET_MAKER = 'MARKET_MAKER',
    GENERAL_SYSTEM = 'GENERAL_SYSTEM',
    BOT_COINS = 'BOT_COINS',
    EXCHANGE_MANAGER = 'EXCHANGE_MANAGER',
}
export enum HeaderProject {
    'bot-garch' = Project.GARCH,
    'bot-telegram' = Project.TELEGRAM,
    'bot-market' = Project.MARKET_MAKER,
    'general-system' = Project.GENERAL_SYSTEM,
    'bot-coins' = Project.BOT_COINS,
    'exchange-manager' = Project.EXCHANGE_MANAGER
}
