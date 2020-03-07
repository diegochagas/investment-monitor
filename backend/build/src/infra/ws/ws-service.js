"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_server_1 = require("../app-server");
var area_en_1 = require("../../shared/models/enum/area.en");
var winston_1 = __importDefault(require("../../shared/middlewares/winston"));
var prefix = 'WS_SERVER => ';
var WSServer = /** @class */ (function () {
    function WSServer() {
    }
    WSServer.getInstance = function () {
        if (!WSServer.instance) {
            WSServer.instance = new WSServer();
        }
        return WSServer.instance;
    };
    WSServer.prototype.connectSocket = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, app_server_1.AppServer.io.use(function (socket, next) {
                        if (socket.handshake.query.authentication === '434B882D1EF0CC952A896DD42612A71D4EC82594523EDDBF197A4DEA4010A515') { /*internal*/
                            winston_1.default.info(prefix + ' Connecting internal client ');
                            next();
                        }
                        else if (socket.handshake.query.authentication === '30E0ECC4B7F193E8D56E34E65DAAD1626C2B8729C8FB495DB2C9BEE8304B8B3E') { /*external*/
                            winston_1.default.info(prefix + ' Connecting external client ');
                            next();
                        }
                        else
                            next(new Error('Authentication error'));
                    }).on('connect', function (socket) {
                        winston_1.default.info(prefix + ("Connected client on port " + app_server_1.AppServer.wsPort + " "));
                        socket.on('rooms', function (rooms) {
                            socket.join(rooms);
                            winston_1.default.info(prefix + ("[client in romms: " + rooms + "]"));
                        });
                        socket.on('disconnect', function (area) {
                            winston_1.default.info(prefix + ("Socket " + socket.id + " disconnected."));
                        });
                        if (WSServer.socket === undefined) {
                            WSServer.socket = socket;
                        }
                        return Promise.resolve();
                    })];
            });
        });
    };
    WSServer.prototype.send = function (message, area) {
        if (area.includes('COIN_API') || area.includes('COINAPI'))
            winston_1.default.debug(prefix + ' send msg to room: ' + area);
        else
            winston_1.default.info(prefix + ("send msg to rooms: " + area));
        if (app_server_1.AppServer.io.to(area) != undefined && area != area_en_1.AreaEn.RECONNECT) {
            app_server_1.AppServer.io.to(area).emit(area, message);
        }
    };
    return WSServer;
}());
exports.WSServer = WSServer;
exports.wsRoom = {
    'BOT_EVENTS_GARCH': area_en_1.AreaEn.ROBOT_GARCH,
    'BOT_EVENTS_MARKETMAKER': area_en_1.AreaEn.ROBOT_MARKET_MAKER,
    'BOT_EVENTS_TELEGRAM': area_en_1.AreaEn.ROBOT_TELEGRAM
};
//# sourceMappingURL=ws-service.js.map