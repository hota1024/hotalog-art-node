import { ArtNodeType } from './ArtNodeType';
import { ArtNodeAttribute } from './ArtNodeAttribute';
export declare class ArtNode {
    type: ArtNodeType;
    attributes: Array<ArtNodeAttribute>;
    nodes: Array<ArtNode | string>;
    constructor(data?: Partial<ArtNode>);
    toString(): string;
}
