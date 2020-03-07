import {IsNumber, IsOptional} from "class-validator";


/**
 * @typedef PercentUpdate
 * @property { integer } bid
 * @property { integer } ask
 */
export class PercentUpdate {
    @IsOptional()
    @IsNumber()
    bid?: number = undefined;

    @IsOptional()
    @IsNumber()
    ask?: number = undefined;
}
