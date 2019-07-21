"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SesameDeviceTask_1 = require("./SesameDeviceTask");
var SesameDeviceCommand;
(function (SesameDeviceCommand) {
    SesameDeviceCommand["Lock"] = "lock";
    SesameDeviceCommand["Unlock"] = "unlock";
    SesameDeviceCommand["Sync"] = "sync";
})(SesameDeviceCommand = exports.SesameDeviceCommand || (exports.SesameDeviceCommand = {}));
class SesameDevice {
    constructor(info, client) {
        this._device_id = info.device_id;
        this._serial = info.serial;
        this._nick_name = info.nick_name;
        this._client = client;
    }
    /**
     * Device id
     */
    get device_id() {
        return this._device_id;
    }
    /**
     * Serial number
     */
    get serial() {
        return this._serial;
    }
    /**
     * Nickname
     */
    get nick_name() {
        return this._nick_name;
    }
    /**
     * Get device state
     */
    getState() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._client.axios.get(`https://api.candyhouse.co/public/sesame/${this._device_id}`);
            return response.data;
        });
    }
    /**
     * Post controll command
     * @param command Command
     */
    postControll(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._client.axios.post(`https://api.candyhouse.co/public/sesame/${this._device_id}`, {
                command
            });
            return new SesameDeviceTask_1.SesameDeviceTask(response.data, this._client);
        });
    }
    /**
     * Lock device
     */
    lock() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postControll(SesameDeviceCommand.Lock);
        });
    }
    /**
     * Unlock device
     */
    unlock() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postControll(SesameDeviceCommand.Unlock);
        });
    }
    /**
     * Sync device
     */
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postControll(SesameDeviceCommand.Sync);
        });
    }
}
exports.SesameDevice = SesameDevice;
//# sourceMappingURL=SesameDevice.js.map