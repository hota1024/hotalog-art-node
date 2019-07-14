"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArtNodeHTMLCompiler_1 = require("./ArtNodeHTMLCompiler");
const markdown_it_1 = __importDefault(require("markdown-it"));
exports.Markdown = new markdown_it_1.default({
    highlight: (code, filename) => {
        filename = filename || '';
        const splited = filename.split('|');
        const title = splited[0] || '';
        const language = splited[1] || '';
        return `<pre is-code code-title="${title}" code-language="${language}"><code>${exports.Markdown.utils.escapeHtml(code)}</code></pre>`;
    }
});
class ArtNodeMarkdownCompiler {
    compile(markdown) {
        const htmlCompiler = new ArtNodeHTMLCompiler_1.ArtNodeHTMLCompiler();
        const html = exports.Markdown.render(markdown);
        const node = htmlCompiler.compile(html);
        return node;
    }
}
exports.ArtNodeMarkdownCompiler = ArtNodeMarkdownCompiler;
//# sourceMappingURL=ArtNodeMarkdownCompiler.js.map