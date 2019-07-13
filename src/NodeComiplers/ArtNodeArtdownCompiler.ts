import { ArtNodeType } from '../ArtNodeType'
import { ArtNode } from '../ArtNode'
import { IArtNodeCompiler } from '../IArtNodeCompiler'

type ArtdownComponent = {
  type: ArtdownComponentType
  regexp: RegExp
  replacer: string
}

enum ParseMode {
  Top,
  Code
}

enum ArtdownComponentType {
  Inline,
  Block
}

export const ArtdownComponents: Array<ArtdownComponent> = [
  // Headers
  {
    type: ArtdownComponentType.Block,
    regexp: /^# (.*)$/g,
    replacer: '<header1>$1</header1>'
  },
  {
    type: ArtdownComponentType.Block,
    regexp: /^## (.*)$/g,
    replacer: '<header2>$1</header2>'
  },
  {
    type: ArtdownComponentType.Block,
    regexp: /^### (.*)$/g,
    replacer: '<header3>$1</header3>'
  },
  {
    type: ArtdownComponentType.Block,
    regexp: /^#### (.*)$/g,
    replacer: '<header4>$1</header4>'
  },
  {
    type: ArtdownComponentType.Block,
    regexp: /^##### (.*)$/g,
    replacer: '<header5>$1</header5>'
  },
  {
    type: ArtdownComponentType.Block,
    regexp: /^###### (.*)$/g,
    replacer: '<header6>$1</header6>'
  },

  // Strong
  {
    type: ArtdownComponentType.Inline,
    regexp: /\*\*(.*)\*\*/g,
    replacer: '<strong>$1</strong>'
  },

  // Italic
  {
    type: ArtdownComponentType.Inline,
    regexp: /\*(.*)\*/g,
    replacer: '<italic>$1</italic>'
  },

  // Escape
  {
    type: ArtdownComponentType.Inline,
    regexp: /\\(.)/g,
    replacer: '$1'
  }
]

export class NodeArtdownCompiler implements IArtNodeCompiler<string> {
  public compile(artdown: string) {
    const node = new ArtNode({ type: ArtNodeType.Root })
    let xmlText = ''
    let paragraphStarted = false

    const lines = artdown.split(/\n/g)

    lines.forEach(line => {
      let blockMarked = false
      ArtdownComponents.forEach(component => {
        if (component.regexp.test(line)) {
          if (component.type === ArtdownComponentType.Block) blockMarked = true
          line = line.replace(component.regexp, component.replacer)
        }
      })

      if (paragraphStarted) {
        blockMarked = true
        if (!line) {
          paragraphStarted = false
          line = `</paragraph>`
        }
      } else {
        if (!blockMarked) {
          paragraphStarted = true
          line = `<paragraph>${line}`
        }
      }

      if (!blockMarked) line += '<break />\n'

      xmlText += line
    })

    if (paragraphStarted) xmlText += '</paragraph>'

    artdown = artdown.replace(
      /```(.*)\n((?:.|\n)*)\n```/g,
      '<code title="$1">$2</code>'
    )
    console.log(xmlText)

    return node
  }
}
