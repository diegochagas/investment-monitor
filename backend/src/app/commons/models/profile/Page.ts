import {IsDefined, IsEnum, IsNotEmpty, IsString} from "class-validator";

export enum ProfileRule {
    WRITE = 'write',
    READ = 'read'
}

/**
 * @typedef Page
 * @property { string } path.required - Path - eg: /instance
 * @property { enum } rule.required - Rule - eg: write, read
 */
export class Page {

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    path?: string = undefined;

    @IsDefined()
    @IsEnum(ProfileRule)
    @IsNotEmpty()
    rule?: ProfileRule = undefined;
}


