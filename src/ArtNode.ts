import { ArtNodeType } from './ArtNodeType'
import { ArtNodeAttribute } from './ArtNodeAttribute'

export class ArtNode {
  public type: ArtNodeType
  public attributes: Array<ArtNodeAttribute>
  public nodes: Array<ArtNode | string>

  public constructor(data?: Partial<ArtNode>) {
    this.type = data.type || ArtNodeType.Unknown
    this.attributes = data.attributes || []
    this.nodes = data.nodes || []
  }

  public toString(): string {
    return JSON.stringify(this)
  }
}
