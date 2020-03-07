import {IsDefined, IsNumber} from "class-validator";

export class IFractionOrder {

    @IsDefined()
    @IsNumber()
    fractionPercent?: number = undefined;

    @IsDefined()
    @IsNumber()
    fractionQuantity?: number = undefined;
}
