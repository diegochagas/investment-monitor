import {IsDefined, IsNumber} from "class-validator";

/**
 * @typedef FractionOrder
 * @property { integer } fractionPercent
 * @property { integer } fractionQuantity
 */
export class FractionOrder {

    @IsDefined()
    @IsNumber()
    fractionPercent?: number = undefined;

    @IsDefined()
    @IsNumber()
    fractionQuantity?: number = undefined;
}
