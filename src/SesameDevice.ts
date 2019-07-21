import {
  SesameDeviceTask,
  SesameDeviceTaskInforamtion
} from './SesameDeviceTask'
import { SesameClient } from './SesameClient'

export type SesameDeviceInformation = {
  device_id: string
  serial: string
  nick_name: string
}

export type SesameDeviceState = {
  locked: boolean
  battery: number
  responsive: boolean
}

export enum SesameDeviceCommand {
  Lock = 'lock',
  Unlock = 'unlock',
  Sync = 'sync'
}

export class SesameDevice {
  private _device_id: string
  private _serial: string
  private _nick_name: string

  private _client: SesameClient

  public constructor(info: SesameDeviceInformation, client: SesameClient) {
    this._device_id = info.device_id
    this._serial = info.serial
    this._nick_name = info.nick_name

    this._client = client
  }

  /**
   * Device id
   */
  public get device_id(): string {
    return this._device_id
  }

  /**
   * Serial number
   */
  public get serial(): string {
    return this._serial
  }

  /**
   * Nickname
   */
  public get nick_name(): string {
    return this._nick_name
  }

  /**
   * Get device state
   */
  public async getState(): Promise<SesameDeviceState> {
    const response = await this._client.axios.get(
      `https://api.candyhouse.co/public/sesame/${this._device_id}`
    )

    return response.data as SesameDeviceState
  }

  /**
   * Post controll command
   * @param command Command
   */
  public async postControll(
    command: SesameDeviceCommand
  ): Promise<SesameDeviceTask> {
    const response = await this._client.axios.post(
      `https://api.candyhouse.co/public/sesame/${this._device_id}`,
      {
        command
      }
    )

    return new SesameDeviceTask(response.data, this._client)
  }

  /**
   * Lock device
   */
  public async lock(): Promise<SesameDeviceTask> {
    return await this.postControll(SesameDeviceCommand.Lock)
  }

  /**
   * Unlock device
   */
  public async unlock(): Promise<SesameDeviceTask> {
    return await this.postControll(SesameDeviceCommand.Unlock)
  }

  /**
   * Sync device
   */
  public async sync(): Promise<SesameDeviceTask> {
    return await this.postControll(SesameDeviceCommand.Sync)
  }
}
