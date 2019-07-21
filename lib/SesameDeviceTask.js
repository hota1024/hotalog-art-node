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
var SesameDeviceTaskResultStatus;
(function (SesameDeviceTaskResultStatus) {
    SesameDeviceTaskResultStatus["Processing"] = "processing";
    SesameDeviceTaskResultStatus["Terminated"] = "terminated";
})(SesameDeviceTaskResultStatus = exports.SesameDeviceTaskResultStatus || (exports.SesameDeviceTaskResultStatus = {}));
class SesameDeviceTaskResult {
    constructor(info, task) {
        this._task_id = info.task_id;
        this._status = info.status;
        this._successful = info.successful;
        this._error = info.error;
        this._task = task;
    }
    get task_id() {
        return this._task_id;
    }
    get status() {
        return this._status;
    }
    get successful() {
        return this._successful;
    }
    get error() {
        return this._error;
    }
    get task() {
        return this._task;
    }
}
exports.SesameDeviceTaskResult = SesameDeviceTaskResult;
class SesameDeviceTask {
    constructor(info, client) {
        this._task_id = info.task_id;
        this._client = client;
    }
    getResult() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._client.axios.get(`https://api.candyhouse.co/public/action-result?task_id=${this._task_id}`);
            return new SesameDeviceTaskResult(response.data, this);
        });
    }
    get task_id() {
        return this._task_id;
    }
}
exports.SesameDeviceTask = SesameDeviceTask;
//# sourceMappingURL=SesameDeviceTask.js.map