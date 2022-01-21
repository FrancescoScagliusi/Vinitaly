export class Vino{

  /*

Classe per rappresentare un vino, composta da tutti i suoi dettagli con il quale può essere descritto.
Utilizzata per la query che ritorna i dettagli di un vino

*/

  name: string = "";
  aroma?: string[];
  origine: string = "";
  grado: string = "";
  pressione: string = "";
  annata:  string = "";
  prezzo : string = "";
  dosaggio : string = "";
  cantina : string = "";
  vitigno?: string[];
  colore: string = "";
  struttura: string ="";


  constructor(name: string, aroma: string[], origine: string, grado: string, pressione: string, annata: string, prezzo: string, dosaggio: string, cantina: string, vitigno: string[], colore: string, struttura: string) {
    this.name = name;
    this.aroma = aroma;
    this.origine = origine;
    this.grado = grado;
    this.pressione = pressione;
    this.annata = annata;
    this.prezzo = prezzo;
    this.dosaggio = dosaggio;
    this.cantina = cantina;
    this.vitigno = vitigno;
    this.colore = colore;
    this.struttura = struttura;
  }
}
