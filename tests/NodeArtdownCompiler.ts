import { NodeArtdownCompiler } from '../src/NodeComiplers/ArtNodeArtdownCompiler'
import { it, describe, before } from 'mocha'
import { assert } from 'chai'
import { promisify } from 'util'
import fs from 'fs'

describe('NodeArtdownCompilerのテスト', function() {
  let testArtdown: string

  before(async () => {
    testArtdown = await promisify(fs.readFile)(`${__dirname}/test.art`, 'utf8')
  })

  it('Artdownから生成できるか', () => {
    const compiler = new NodeArtdownCompiler()
    const result = compiler.compile(testArtdown)
  })
})
