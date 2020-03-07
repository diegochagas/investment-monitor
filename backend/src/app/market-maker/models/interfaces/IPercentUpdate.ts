import {IsDefined, IsNotEmpty, IsNumber, IsOptional} from "class-validator";

export class IPercentUpdate {
    @IsOptional()
    @IsNumber()
    bid?: number = undefined;

    @IsOptional()
    @IsNumber()
    ask?: number = undefined;
}
