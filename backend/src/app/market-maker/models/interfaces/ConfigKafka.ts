/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
export class ConfigKafka {
    /**
     * valor não enviado pelo backend, validar com secret manager
     */
    // host: string = undefined;

    /**
     * Lista de tópicos do cryptoMarketPrice e forexMarketPrice
     */
    subscribe?: string[] = [];
}