import {Typegoose, prop} from "typegoose";
import {IsDefined, IsEmail, IsString} from "class-validator";
import {connectToEvoManagerDB} from "../db/db";

export class User extends Typegoose {

    @IsDefined()
    @IsString()
    @prop()
    name?: string = undefined;

    @IsDefined()
    @IsEmail()
    @prop()
    email?: string = undefined;
}

export const UserSchema = new User().getModelForClass(User, {
    existingConnection: connectToEvoManagerDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'users'
    }
});
