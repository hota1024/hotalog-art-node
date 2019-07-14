import { ArtNode } from '../ArtNode';
import { IArtNodeCompiler } from '../IArtNodeCompiler';
import MarkdownIt from 'markdown-it';
export declare const Markdown: MarkdownIt;
export declare class ArtNodeMarkdownCompiler implements IArtNodeCompiler<string> {
    compile(markdown: string): ArtNode;
}
