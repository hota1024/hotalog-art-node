"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArtNodeType_1 = require("./ArtNodeType");
class ArtNode {
    constructor(data) {
        this.type = data.type || ArtNodeType_1.ArtNodeType.Unknown;
        this.attributes = data.attributes || [];
        this.nodes = data.nodes || [];
    }
    toString() {
        return JSON.stringify(this);
    }
}
exports.ArtNode = ArtNode;
//# sourceMappingURL=ArtNode.js.map