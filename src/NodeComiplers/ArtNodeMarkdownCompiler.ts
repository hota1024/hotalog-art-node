import { ArtNodeHTMLCompiler } from './ArtNodeHTMLCompiler'
import { ArtNode } from '../ArtNode'
import { IArtNodeCompiler } from '../IArtNodeCompiler'
import MarkdownIt from 'markdown-it'

export const Markdown = new MarkdownIt({
  highlight: (code, filename): string => {
    filename = filename || ''
    const splited = filename.split('|')
    const title = splited[0] || ''
    const language = splited[1] || ''

    return `<pre is-code code-title="${title}" code-language="${language}"><code>${Markdown.utils.escapeHtml(
      code
    )}</code></pre>`
  }
})

export class ArtNodeMarkdownCompiler implements IArtNodeCompiler<string> {
  public compile(markdown: string): ArtNode {
    const htmlCompiler = new ArtNodeHTMLCompiler()
    const html = Markdown.render(markdown)
    const node = htmlCompiler.compile(html)

    return node
  }
}
