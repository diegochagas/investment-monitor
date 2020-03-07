/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
import {IsDefined, IsNumber} from "class-validator";

export class ConfigExposition {
    /**
     * % Limite da exposição
     */
    @IsDefined()
    @IsNumber()
    expLimit?: number = undefined;

    /**
     * % Limite para incremento de exposição
     */
    @IsDefined()
    @IsNumber()
    expLimitStep?: number = undefined;

    /**
     * % Spread de exposição
     */
    @IsDefined()
    @IsNumber()
    expSpread?: number = undefined;

    /**
     * % Multiplicador do tamanho de ordens por exposição (Size multiply)
     */
    @IsDefined()
    @IsNumber()
    sizeMultiply?: number = undefined;
}