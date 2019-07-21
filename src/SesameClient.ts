import { SesameDevice } from './SesameDevice'
import axios, { AxiosInstance } from 'axios'

/**
 * Sesame client confiuration type
 */
export type SesameClientConfiguration = {
  token?: string
}

/**
 * Sesame client class
 */
export class SesameClient {
  private _token: string
  private _axios: AxiosInstance

  public constructor(config: SesameClientConfiguration) {
    this._token = config.token
    this._axios = axios.create()
    this._axios.defaults.headers.common['Authorization'] = config.token
  }

  /**
   * Using Authorization token
   */
  public get token(): string {
    return this._token
  }

  /**
   * Get SESAME devices
   */
  public async getSesameDevices(): Promise<SesameDevice[]> {
    const response = await this.axios.get(
      'https://api.candyhouse.co/public/sesames'
    )
    const devices = response.data.map(device => new SesameDevice(device, this))

    return devices as SesameDevice[]
  }

  /**
   * Axios isntance
   */
  public get axios(): AxiosInstance {
    return this._axios
  }
}
