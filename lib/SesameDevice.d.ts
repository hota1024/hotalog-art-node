import { SesameDeviceTask } from './SesameDeviceTask';
import { SesameClient } from './SesameClient';
export declare type SesameDeviceInformation = {
    device_id: string;
    serial: string;
    nick_name: string;
};
export declare type SesameDeviceState = {
    locked: boolean;
    battery: number;
    responsive: boolean;
};
export declare enum SesameDeviceCommand {
    Lock = "lock",
    Unlock = "unlock",
    Sync = "sync"
}
export declare class SesameDevice {
    private _device_id;
    private _serial;
    private _nick_name;
    private _client;
    constructor(info: SesameDeviceInformation, client: SesameClient);
    /**
     * Device id
     */
    readonly device_id: string;
    /**
     * Serial number
     */
    readonly serial: string;
    /**
     * Nickname
     */
    readonly nick_name: string;
    /**
     * Get device state
     */
    getState(): Promise<SesameDeviceState>;
    /**
     * Post controll command
     * @param command Command
     */
    postControll(command: SesameDeviceCommand): Promise<SesameDeviceTask>;
    /**
     * Lock device
     */
    lock(): Promise<SesameDeviceTask>;
    /**
     * Unlock device
     */
    unlock(): Promise<SesameDeviceTask>;
    /**
     * Sync device
     */
    sync(): Promise<SesameDeviceTask>;
}
