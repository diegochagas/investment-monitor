"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var system_errors_1 = require("../helpers/system-errors");
var ApplicationResponse_1 = require("./ApplicationResponse");
var ExceptionResponse = /** @class */ (function () {
    function ExceptionResponse() {
    }
    ExceptionResponse.exec = function (ex, opt) {
        if (ex instanceof ApplicationResponse_1.ApplicationResponse) {
            return ex;
        }
        else if (ex.name === 'MongoError') {
            var errorMessage = (system_errors_1.SystemErrors.Mongoose.Errors.find(function (x) { return x.code === ex['code'].toString(); }));
            if (errorMessage)
                return new ApplicationResponse_1.ApplicationResponse(400, {}, errorMessage.message, errorMessage.code);
            if (!opt)
                return new ApplicationResponse_1.ApplicationResponse(400, {}, 'Service Error');
            return opt;
        }
        else {
            if (!opt)
                return new ApplicationResponse_1.ApplicationResponse(500, {}, 'Internal Error');
            return opt;
        }
    };
    return ExceptionResponse;
}());
exports.ExceptionResponse = ExceptionResponse;
//# sourceMappingURL=ExceptionResponse.js.map