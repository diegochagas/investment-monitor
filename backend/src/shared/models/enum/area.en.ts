export enum AreaEn {
    RECONNECT = 'RECONNECT',
    ROBOT_GARCH = 'bot-garch',
    ROBOT_MARKET_MAKER = 'bot-market',
    ROBOT_TELEGRAM = 'bot-telegram',
    DASHBOARD_GARCH = 'dashboard-garch',
    DASHBOARD_MARKET_MAKER = 'dashboard-market',
    DASHBOARD_TELEGRAM = 'dashboard-telegram',
    CRYPTO_DATA_COLLECTOR = 'CRYPTO_DATA_COLLECTOR'
}

export enum InstanceRoom {
    GARCH = AreaEn.ROBOT_GARCH,
    TELEGRAM = AreaEn.ROBOT_TELEGRAM,
    MARKETMAKER = AreaEn.ROBOT_MARKET_MAKER
}

export enum RoomDashboard {
    'MARKET_MAKER' = AreaEn.DASHBOARD_MARKET_MAKER,
    'GARCH' = AreaEn.DASHBOARD_GARCH,
    'TELEGRAM' = AreaEn.DASHBOARD_TELEGRAM
}
