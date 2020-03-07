import {Application} from "./Application";
import {IsArray, IsDefined, IsNotEmpty, IsString, ValidateNested} from "class-validator";

/**
 * @typedef Profile
 * @property { string } profileName.required - Profile name - eg: admin
 * @property { Array.<Application> } applications - Applications
 */
export class Profile {

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    profileName?: string = undefined;

    @ValidateNested()
    @IsArray()
    applications: Application[] = [new Application()];
}
