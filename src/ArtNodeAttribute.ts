export class ArtNodeAttribute {
  public name: string
  public value: any

  public constructor(attribute: Required<ArtNodeAttribute>) {
    this.name = attribute.name
    this.value = attribute.value
  }
}
