import { ArtNode } from '../ArtNode';
import { IArtNodeCompiler } from '../IArtNodeCompiler';
declare type ArtdownComponent = {
    type: ArtdownComponentType;
    regexp: RegExp;
    replacer: string;
};
declare enum ArtdownComponentType {
    Inline = 0,
    Block = 1
}
export declare const ArtdownComponents: Array<ArtdownComponent>;
export declare class NodeArtdownCompiler implements IArtNodeCompiler<string> {
    compile(artdown: string): ArtNode;
}
export {};
