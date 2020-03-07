import { SystemErrors } from "../helpers/system-errors";
import {ApplicationResponse} from "./ApplicationResponse";


export class ExceptionResponse {
    public static exec(ex: any, opt?: ApplicationResponse<any>): ApplicationResponse<any> {
        if (ex instanceof ApplicationResponse) {
            return ex
        } else if (ex.name === 'MongoError') {
            const errorMessage = (SystemErrors.Mongoose.Errors.find(x => x.code === ex['code'].toString()));
            if (errorMessage)
                return new ApplicationResponse(400, {}, errorMessage.message, errorMessage.code);
            if(!opt)
                return new ApplicationResponse(400, {}, 'Service Error');
            return opt;    
        } else {
            if(!opt)
                return new ApplicationResponse(500, {}, 'Internal Error');
            return opt;
        }
    }
}
