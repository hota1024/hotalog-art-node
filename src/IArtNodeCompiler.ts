import { ArtNode } from './ArtNode'

export interface IArtNodeCompiler<TCompileSource> {
  compile(source: TCompileSource): ArtNode
}
