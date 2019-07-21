import { SesameDevice } from './SesameDevice';
import { AxiosInstance } from 'axios';
/**
 * Sesame client confiuration type
 */
export declare type SesameClientConfiguration = {
    token?: string;
};
/**
 * Sesame client class
 */
export declare class SesameClient {
    private _token;
    private _axios;
    constructor(config: SesameClientConfiguration);
    /**
     * Using Authorization token
     */
    readonly token: string;
    /**
     * Get SESAME devices
     */
    getSesameDevices(): Promise<SesameDevice[]>;
    /**
     * Axios isntance
     */
    readonly axios: AxiosInstance;
}
