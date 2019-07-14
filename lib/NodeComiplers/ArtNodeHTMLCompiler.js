"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArtNodeAttribute_1 = require("./../ArtNodeAttribute");
const ArtNodeType_1 = require("./../ArtNodeType");
const ArtNode_1 = require("./../ArtNode");
const jsdom_1 = require("jsdom");
exports.TagNameArtNodeTypeSets = [
    { tagName: 'h1', artNodeType: ArtNodeType_1.ArtNodeType.Header1 },
    { tagName: 'h2', artNodeType: ArtNodeType_1.ArtNodeType.Header2 },
    { tagName: 'h3', artNodeType: ArtNodeType_1.ArtNodeType.Header3 },
    { tagName: 'h4', artNodeType: ArtNodeType_1.ArtNodeType.Header4 },
    { tagName: 'h5', artNodeType: ArtNodeType_1.ArtNodeType.Header5 },
    { tagName: 'h6', artNodeType: ArtNodeType_1.ArtNodeType.Header6 },
    { tagName: 'em', artNodeType: ArtNodeType_1.ArtNodeType.Emphasis },
    { tagName: 'strong', artNodeType: ArtNodeType_1.ArtNodeType.Strong },
    { tagName: 'pre', artNodeType: ArtNodeType_1.ArtNodeType.PreformattedText },
    { tagName: 'code', artNodeType: ArtNodeType_1.ArtNodeType.Code },
    { tagName: 'img', artNodeType: ArtNodeType_1.ArtNodeType.Image },
    { tagName: 'a', artNodeType: ArtNodeType_1.ArtNodeType.Link },
    { tagName: 'ul', artNodeType: ArtNodeType_1.ArtNodeType.UnderedList },
    { tagName: 'ol', artNodeType: ArtNodeType_1.ArtNodeType.OrderedList },
    { tagName: 'li', artNodeType: ArtNodeType_1.ArtNodeType.ListItem }
];
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
class ArtNodeHTMLCompilerHighlightCodeInterceptor {
    checkAccept(node) {
        // First node must have is-code attribute
        if (!node.attributes.getNamedItem('is-code'))
            return false;
        // First node's tag must be pre
        if (node.localName !== 'pre')
            return false;
        // First node's must have one child
        if (node.children.length !== 1)
            return false;
        // First node's must have code element
        if (node.children[0].localName !== 'code')
            return false;
        return true;
    }
    compile(node) {
        const highlightCode = new ArtNode_1.ArtNode({ type: ArtNodeType_1.ArtNodeType.HighlightCode });
        const code = node.children[0].innerHTML;
        const title = node.getAttribute('code-title') || '';
        const language = node.getAttribute('code-language') || '';
        highlightCode.attributes = [
            new ArtNodeAttribute_1.ArtNodeAttribute({ name: 'title', value: title }),
            new ArtNodeAttribute_1.ArtNodeAttribute({ name: 'language', value: language })
        ];
        highlightCode.nodes.push(new ArtNode_1.ArtNode({ type: ArtNodeType_1.ArtNodeType.Text, nodes: [code] }));
        return highlightCode;
    }
    isBreak() {
        return true;
    }
}
exports.ArtNodeHTMLCompilerHighlightCodeInterceptor = ArtNodeHTMLCompilerHighlightCodeInterceptor;
/**
 * HTML to ArtNode compiler
 */
class ArtNodeHTMLCompiler {
    constructor() {
        this.interceptors = [
            new ArtNodeHTMLCompilerHighlightCodeInterceptor()
        ];
    }
    /**
     * HTML tag name string to ArtNodeType
     * @param {string} tagName HTML tag name
     */
    static TagNameToArtNodeType(tagName) {
        const tagNameArtNodeTypeSet = exports.TagNameArtNodeTypeSets.find(set => set.tagName === tagName);
        if (tagNameArtNodeTypeSet) {
            return tagNameArtNodeTypeSet.artNodeType;
        }
        return ArtNodeType_1.ArtNodeType.Unknown;
    }
    /**
     * HTMLElement's attribute `NamedNodeMap` to `ArtNodeAttribute[]`
     * @param {NamedNodeMap} attributes HTMLElement's attributes
     */
    static HTMLElementAttributesToArtNodeAttributes(attributes) {
        const attributesArray = Array.from(attributes);
        return attributesArray.map(attribute => new ArtNodeAttribute_1.ArtNodeAttribute(attribute));
    }
    /**
     * Compile html to ArtNode
     */
    compile(html) {
        const { window } = new jsdom_1.JSDOM(`<div>${html}</div>`);
        const { document } = window;
        this.window = window;
        const root = document.querySelector('div');
        const node = this.elementToArtNode(root);
        node.type = ArtNodeType_1.ArtNodeType.Root;
        return node;
    }
    /**
     * Convert HTMLElement to ArtNode
     */
    elementToArtNode(element) {
        let node;
        let isBreak = false;
        if (element instanceof this.window.Text) {
            node = new ArtNode_1.ArtNode({
                type: ArtNodeType_1.ArtNodeType.Text,
                nodes: [element.data]
            });
        }
        else {
            const interceptor = this.interceptors.find(interceptor => interceptor.checkAccept(element));
            if (interceptor) {
                node = interceptor.compile(element);
                if (interceptor.isBreak())
                    isBreak = interceptor.isBreak();
            }
            else {
                node = new ArtNode_1.ArtNode({
                    type: ArtNodeHTMLCompiler.TagNameToArtNodeType(element.localName),
                    attributes: ArtNodeHTMLCompiler.HTMLElementAttributesToArtNodeAttributes(element.attributes)
                });
            }
        }
        if (!isBreak) {
            element.childNodes.forEach(child => {
                node.nodes.push(this.elementToArtNode(child));
            });
        }
        return node;
    }
}
exports.ArtNodeHTMLCompiler = ArtNodeHTMLCompiler;
//# sourceMappingURL=ArtNodeHTMLCompiler.js.map