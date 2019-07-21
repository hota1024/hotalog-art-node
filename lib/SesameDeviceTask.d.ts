import { SesameClient } from './SesameClient';
export declare type SesameDeviceTaskInforamtion = {
    task_id: string;
};
export declare enum SesameDeviceTaskResultStatus {
    Processing = "processing",
    Terminated = "terminated"
}
export declare type SesameDeviceTaskResultInformation = {
    task_id: string;
    status: SesameDeviceTaskResultStatus;
    successful?: boolean;
    error?: boolean;
};
export declare class SesameDeviceTaskResult {
    private _task_id;
    private _status;
    private _successful;
    private _error;
    private _task;
    constructor(info: SesameDeviceTaskResultInformation, task: SesameDeviceTask);
    readonly task_id: string;
    readonly status: SesameDeviceTaskResultStatus;
    readonly successful: boolean;
    readonly error: boolean;
    readonly task: SesameDeviceTask;
}
export declare class SesameDeviceTask {
    private _task_id;
    private _client;
    constructor(info: SesameDeviceTaskInforamtion, client: SesameClient);
    getResult(): Promise<SesameDeviceTaskResult>;
    readonly task_id: string;
}
