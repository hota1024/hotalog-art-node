import { promisify } from 'util'
import { ArtNodeHTMLCompiler } from '../src/NodeComiplers/ArtNodeHTMLCompiler'
import { it, describe, before } from 'mocha'
import { assert } from 'chai'
import fs from 'fs'

describe('ArtNodeHTMLCompilerのテスト', () => {
  let testHTML: string

  before(async () => {
    testHTML = await promisify(fs.readFile)(`${__dirname}/test.html`, 'utf8')
  })

  it('コンパイルできるか', async () => {
    const compiler = new ArtNodeHTMLCompiler()
    const node = compiler.compile(testHTML)

    console.log(node.toString())
  })
})
