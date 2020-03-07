/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
import {IsBoolean, IsNumber} from "class-validator";

/**
 * Prex - Preço de Referência
 */
export class ConfigReferencePrice {
    /**
     * Banda de referência
     */
    @IsNumber()
    prexBand?: number = undefined;

    /**
     * Percentual Externo
     */
    @IsNumber()
    externalPercent?: number = undefined;

    /**
     * Percentual Interno
     */
    @IsNumber()
    internalPercent?: number = undefined;

    /**
     * Habilitar o forex no calculo
     */
    @IsBoolean()
    forexEnable?: boolean = undefined;
}