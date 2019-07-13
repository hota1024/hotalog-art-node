import { ArtNodeAttribute } from './../ArtNodeAttribute'
import { ArtNodeType } from './../ArtNodeType'
import { ArtNode } from './../ArtNode'
import { IArtNodeCompiler } from './../IArtNodeCompiler'
import { JSDOM, DOMWindow } from 'jsdom'

/**
 * HTML TagName and NodeType set interface
 */
export interface TagNameArtNodeTypeSet {
  /**
   * HTML Tag name
   */
  tagName: keyof HTMLElementTagNameMap

  /**
   * Art node type
   */
  artNodeType: ArtNodeType
}

export const TagNameArtNodeTypeSets: Array<TagNameArtNodeTypeSet> = [
  { tagName: 'h1', artNodeType: ArtNodeType.Header1 },
  { tagName: 'h2', artNodeType: ArtNodeType.Header2 },
  { tagName: 'h3', artNodeType: ArtNodeType.Header3 },
  { tagName: 'h4', artNodeType: ArtNodeType.Header4 },
  { tagName: 'h5', artNodeType: ArtNodeType.Header5 },
  { tagName: 'h6', artNodeType: ArtNodeType.Header6 },

  { tagName: 'em', artNodeType: ArtNodeType.Emphasis },
  { tagName: 'strong', artNodeType: ArtNodeType.Strong },

  { tagName: 'pre', artNodeType: ArtNodeType.PreformattedText },
  { tagName: 'code', artNodeType: ArtNodeType.Code },

  { tagName: 'img', artNodeType: ArtNodeType.Image },
  { tagName: 'a', artNodeType: ArtNodeType.Link },

  { tagName: 'ul', artNodeType: ArtNodeType.UnderedList },
  { tagName: 'ol', artNodeType: ArtNodeType.OrderedList },
  { tagName: 'li', artNodeType: ArtNodeType.ListItem }
]

/**
 * ArtNode HTML compiler interceptor interface
 */
export interface IArtNodeHTMLCompilerInterceptor {
  checkAccept(node: ChildNode): boolean
  compile(node: ChildNode): ArtNode
  isBreak(): boolean
}

/**
 * ArtNode HTML compiler HighlightCode component interceptor
 *
 * ```html
 * <pre is-code title="test.ts" language="TypeScript"><code>console.log('Hello world')</code></pre>
 * ```
 * to
 * ```json
 * {
 *   "type": "HighlightCode",
 *   "attributes": [
 *     {
 *       "name": "language",
 *       "value": "TypeScript"
 *     },
 *     {
 *       "name": "title",
 *       "value": "test.ts"
 *     }
 *   ],
 *   "nodes": ["console.log('Hello world')"]
 * }
 * ```
 */
export class ArtNodeHTMLCompilerHighlightCodeInterceptor
  implements IArtNodeHTMLCompilerInterceptor {
  checkAccept(node: HTMLElement): boolean {
    // First node must have is-code attribute
    if (!node.attributes.getNamedItem('is-code')) return false
    // First node's tag must be pre
    if (node.localName !== 'pre') return false
    // First node's must have one child
    if (node.children.length !== 1) return false
    // First node's must have code element
    if (node.children[0].localName !== 'code') return false

    return true
  }

  compile(node: HTMLElement): ArtNode {
    const highlightCode = new ArtNode({ type: ArtNodeType.HighlightCode })
    const code = node.children[0].innerHTML
    const title = node.getAttribute('code-title') || ''
    const language = node.getAttribute('code-language') || ''

    highlightCode.attributes = [
      new ArtNodeAttribute({ name: 'title', value: title }),
      new ArtNodeAttribute({ name: 'language', value: language })
    ]
    highlightCode.nodes.push(
      new ArtNode({ type: ArtNodeType.Text, nodes: [code] })
    )

    return highlightCode
  }

  isBreak(): boolean {
    return true
  }
}

/**
 * HTML to ArtNode compiler
 */
export class ArtNodeHTMLCompiler implements IArtNodeCompiler<string> {
  private window: DOMWindow
  private interceptors: Array<IArtNodeHTMLCompilerInterceptor> = [
    new ArtNodeHTMLCompilerHighlightCodeInterceptor()
  ]

  /**
   * HTML tag name string to ArtNodeType
   * @param {string} tagName HTML tag name
   */
  public static TagNameToArtNodeType<K extends keyof HTMLElementTagNameMap>(
    tagName: K
  ): ArtNodeType {
    const tagNameArtNodeTypeSet = TagNameArtNodeTypeSets.find(
      set => set.tagName === tagName
    )

    if (tagNameArtNodeTypeSet) {
      return tagNameArtNodeTypeSet.artNodeType
    }

    return ArtNodeType.Unknown
  }

  /**
   * HTMLElement's attribute `NamedNodeMap` to `ArtNodeAttribute[]`
   * @param {NamedNodeMap} attributes HTMLElement's attributes
   */
  public static HTMLElementAttributesToArtNodeAttributes(
    attributes: NamedNodeMap
  ): Array<ArtNodeAttribute> {
    const attributesArray = Array.from(attributes)
    return attributesArray.map(attribute => new ArtNodeAttribute(attribute))
  }

  /**
   * Compile html to ArtNode
   */
  public compile(html: string): ArtNode {
    const { window } = new JSDOM(`<div>${html}</div>`)
    const { document } = window
    this.window = window

    const root = document.querySelector('div')
    const node = this.elementToArtNode(root)
    node.type = ArtNodeType.Root

    return node
  }

  /**
   * Convert HTMLElement to ArtNode
   */
  private elementToArtNode(element: HTMLElement): ArtNode {
    let node: ArtNode
    let isBreak: boolean = false

    if (element instanceof this.window.Text) {
      node = new ArtNode({
        type: ArtNodeType.Text,
        nodes: [element.data]
      })
    } else {
      const interceptor = this.interceptors.find(interceptor =>
        interceptor.checkAccept(element)
      )

      if (interceptor) {
        node = interceptor.compile(element)
        if (interceptor.isBreak()) isBreak = interceptor.isBreak()
      } else {
        node = new ArtNode({
          type: ArtNodeHTMLCompiler.TagNameToArtNodeType(
            element.localName as keyof HTMLElementTagNameMap
          ),
          attributes: ArtNodeHTMLCompiler.HTMLElementAttributesToArtNodeAttributes(
            element.attributes
          )
        })
      }
    }

    if (!isBreak) {
      element.childNodes.forEach(child => {
        node.nodes.push(this.elementToArtNode(child as HTMLElement))
      })
    }

    return node
  }
}
