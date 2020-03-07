import {Page} from "./Page";
import {IsArray, IsDefined, IsNotEmpty, IsString, ValidateNested} from "class-validator";

/**
 * @typedef Application
 * @property { string } name.required - Application name - Market maker
 * @property { Array.<Page> } pages - Pages
 */
export class Application {

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    name?:  string = undefined;

    @ValidateNested()
    @IsArray()
    pages: Page[] = [new Page()];
}
