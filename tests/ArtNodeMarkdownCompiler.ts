import { ArtNodeMarkdownCompiler } from './../src/NodeComiplers/ArtNodeMarkdownCompiler'
import { it, describe, before } from 'mocha'
import { assert } from 'chai'

describe('ArtNodeMarkdownCompilerのテスト', () => {
  it('コンパイルできるか', () => {
    const compiler = new ArtNodeMarkdownCompiler()
    const node = compiler.compile('# Hello world')

    console.log(node.toString())
  })
})
