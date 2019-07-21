import { SesameDeviceCommand } from './../src/SesameDevice'
import { SesameClient } from '../src/SesameClient'
import { describe, it } from 'mocha'
import { assert } from 'chai'

describe('Client test', function() {
  this.timeout(60 * 1000)
  const token =
    'p2mJansaS2ylRHDxAcdWltHJM10AfWRYaGb9wGlpXtOaaANZjIXzmDBC-kGuOAgIVrbPZBK4w82g'

  it('Create instance', () => {
    const client = new SesameClient({ token })
    assert.equal(client.token, token)
  })

  it('Get sesames', async () => {
    const client = new SesameClient({ token })
    const sesames = await client.getSesameDevices()
    const sesame = sesames[0]
    console.log(await sesame.getState())
    const task = await sesame.postControll(SesameDeviceCommand.Lock)
    console.log(await task.getResult())
  })
})
