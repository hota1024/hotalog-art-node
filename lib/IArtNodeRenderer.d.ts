export interface IArtNodeRenderer<TRenderResult> {
    render(node: Node): TRenderResult;
}
