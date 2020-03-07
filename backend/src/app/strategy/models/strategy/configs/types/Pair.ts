import {IsString, IsOptional, IsDefined, IsNumber} from "class-validator";

/**
 * @typedef Pair
 * @property { integer } sequencie
 * @property { string } currency
 * @property { string } pair.required
 * @property { string } volume24h
 * @property { integer } volumePercent.required
 * @property { string } type
 * @property { integer } weight.required
 * @property { string } channelId.required
 */
export class Pair {

    @IsNumber()
    @IsOptional()
    sequence?: number = undefined;

    @IsOptional()
    @IsString()
    currency?: string = undefined;

    @IsDefined()
    @IsString()
    pair?: string = undefined;

    @IsOptional()
    @IsString()
    volume24h?: string = undefined;

    @IsNumber()
    @IsDefined()
    volumePercent?: number = undefined;

    @IsString()
    @IsOptional()
    type?: string = undefined;

    @IsDefined()
    @IsNumber()
    weight?: number = undefined;


    @IsString()
    @IsDefined()
    channelId?: string = undefined;
}

