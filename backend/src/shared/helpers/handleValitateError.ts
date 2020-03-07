import {ValidationError} from "class-validator";
import {ApplicationResponse} from "../models/ApplicationResponse";

export const handleValidateError = async (validation: ValidationError[]) => {
    if((validation.length > 0)) {

        const data = validation.map(val => mapMessage(val));
        throw new ApplicationResponse(422, flatten(data))
    } else {
        Promise.resolve()
    }
};

const mapMessage = (validation) => {
    if(validation.children.length > 0)
        return validation.children.map(val => mapMessage(val));
    return {
        property: validation.property,
        value: validation.value,
        status: Object.keys(validation.constraints).map(key => validation.constraints[key])
    }
};

const flatten = (arr) =>{
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};
