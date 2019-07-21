import { SesameClient } from './SesameClient'

export type SesameDeviceTaskInforamtion = {
  task_id: string
}

export enum SesameDeviceTaskResultStatus {
  Processing = 'processing',
  Terminated = 'terminated'
}

export type SesameDeviceTaskResultInformation = {
  task_id: string
  status: SesameDeviceTaskResultStatus
  successful?: boolean
  error?: boolean
}

export class SesameDeviceTaskResult {
  private _task_id: string
  private _status: SesameDeviceTaskResultStatus
  private _successful: boolean
  private _error: boolean

  private _task: SesameDeviceTask

  public constructor(
    info: SesameDeviceTaskResultInformation,
    task: SesameDeviceTask
  ) {
    this._task_id = info.task_id
    this._status = info.status
    this._successful = info.successful
    this._error = info.error

    this._task = task
  }

  public get task_id(): string {
    return this._task_id
  }

  public get status(): SesameDeviceTaskResultStatus {
    return this._status
  }

  public get successful(): boolean {
    return this._successful
  }

  public get error(): boolean {
    return this._error
  }

  public get task(): SesameDeviceTask {
    return this._task
  }
}

export class SesameDeviceTask {
  private _task_id: string
  private _client: SesameClient

  public constructor(info: SesameDeviceTaskInforamtion, client: SesameClient) {
    this._task_id = info.task_id

    this._client = client
  }

  /**
   * Get task result
   */
  public async getResult(): Promise<SesameDeviceTaskResult> {
    const response = await this._client.axios.get(
      `https://api.candyhouse.co/public/action-result?task_id=${this._task_id}`
    )

    return new SesameDeviceTaskResult(response.data, this)
  }

  /**
   * Task id
   */
  public get task_id(): string {
    return this._task_id
  }
}
