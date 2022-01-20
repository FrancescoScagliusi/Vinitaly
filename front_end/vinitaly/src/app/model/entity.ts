export class Entity{

  /*

  Classe per rappresentare un oggetto composto da URI e rispettivo Label, che ritorna dall'esecuzione di una query,

  */

  label: string = ""
  uri: string = ""

  constructor(label: string, uri:string){
    this.label = label;
    this.uri = uri;
  }
}
