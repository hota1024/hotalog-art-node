"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SesameDevice_1 = require("./SesameDevice");
const axios_1 = __importDefault(require("axios"));
/**
 * Sesame client class
 */
class SesameClient {
    constructor(config) {
        this._token = config.token;
        this._axios = axios_1.default.create();
        this._axios.defaults.headers.common['Authorization'] = config.token;
    }
    /**
     * Using Authorization token
     */
    get token() {
        return this._token;
    }
    /**
     * Get SESAME devices
     */
    getSesameDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.get('https://api.candyhouse.co/public/sesames');
            const devices = response.data.map(device => new SesameDevice_1.SesameDevice(device, this));
            return devices;
        });
    }
    /**
     * Axios isntance
     */
    get axios() {
        return this._axios;
    }
}
exports.SesameClient = SesameClient;
//# sourceMappingURL=SesameClient.js.map