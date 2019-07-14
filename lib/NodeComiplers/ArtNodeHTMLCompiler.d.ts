import { ArtNodeAttribute } from './../ArtNodeAttribute';
import { ArtNodeType } from './../ArtNodeType';
import { ArtNode } from './../ArtNode';
import { IArtNodeCompiler } from './../IArtNodeCompiler';
/**
 * HTML TagName and NodeType set interface
 */
export interface TagNameArtNodeTypeSet {
    /**
     * HTML Tag name
     */
    tagName: keyof HTMLElementTagNameMap;
    /**
     * Art node type
     */
    artNodeType: ArtNodeType;
}
export declare const TagNameArtNodeTypeSets: Array<TagNameArtNodeTypeSet>;
/**
 * ArtNode HTML compiler interceptor interface
 */
export interface IArtNodeHTMLCompilerInterceptor {
    checkAccept(node: ChildNode): boolean;
    compile(node: ChildNode): ArtNode;
    isBreak(): boolean;
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
export declare class ArtNodeHTMLCompilerHighlightCodeInterceptor implements IArtNodeHTMLCompilerInterceptor {
    checkAccept(node: HTMLElement): boolean;
    compile(node: HTMLElement): ArtNode;
    isBreak(): boolean;
}
/**
 * HTML to ArtNode compiler
 */
export declare class ArtNodeHTMLCompiler implements IArtNodeCompiler<string> {
    private window;
    private interceptors;
    /**
     * HTML tag name string to ArtNodeType
     * @param {string} tagName HTML tag name
     */
    static TagNameToArtNodeType<K extends keyof HTMLElementTagNameMap>(tagName: K): ArtNodeType;
    /**
     * HTMLElement's attribute `NamedNodeMap` to `ArtNodeAttribute[]`
     * @param {NamedNodeMap} attributes HTMLElement's attributes
     */
    static HTMLElementAttributesToArtNodeAttributes(attributes: NamedNodeMap): Array<ArtNodeAttribute>;
    /**
     * Compile html to ArtNode
     */
    compile(html: string): ArtNode;
    /**
     * Convert HTMLElement to ArtNode
     */
    private elementToArtNode;
}
