import { Component, OnInit } from '@angular/core';
import {Entity} from "../model/entity";
import {Vino} from "../model/vino";
import {ViniService} from "../service/vini.service";
import {CantinaService} from "../service/cantina.service";
import {RegioneService} from "../service/regione.service";

@Component({
  selector: 'app-vini-regione',
  templateUrl: './vini-regione.component.html',
  styleUrls: ['./vini-regione.component.css']
})
export class ViniRegioneComponent implements OnInit {

  /*
    Component per mostrare i vini da wikidata, prodotti in una regione scelta da menù
 */

  vini?: Entity[]; //risultato ricerca

  regioni? :Entity[]; //cantine per menu

  selectedRegione: string =  ""; //regione selezionata

  vino? :Vino; //vino cliccato per info

  infobox: boolean = false;

  //dettagli vino da wikidata
  denominazione: string = "";
  descrizione: string = "";
  image: string = "";



  constructor(private viniservice: ViniService,
              private regioneservice: RegioneService) { }

  //init per avvalorare le voci del menù regione
  ngOnInit(): void {
    this.regioneservice.getRegione().subscribe(data =>{
      this.regioni = data
    })

  }

  //avvalora la variabile contenente la regione selezionata dal menù
  updateRegione(e : any){
    this.selectedRegione = e.target.value.toString()
    this.infobox = false;
  }

  //metodo richiamato cliccando sul tasto di ricerca, avendo selezionato una regiona, ritorna l'elenco dei vini prodotti in quella regione

  search(): void{
    console.log("Regione",this.selectedRegione)
    this.infobox = false;

    this.viniservice.findWineByRegione(this.selectedRegione).subscribe(data => {
      console.log(data)
      if(data.length>0){
        this.vini=data
      }
      else{
        this.vini = [new Entity("Nessun Risultato","")];
      }
    });

  }

  //metodo richiamato cliccando su [VEDI INFO] per ricercare i dettagli di un vino

  showDetails(vino: string){
    this.infobox=true
    console.log("uri vino",vino)
    this.viniservice.getDetailsWiki(vino).subscribe(data =>{
      console.log(data)
      this.denominazione = data[0]
      this.descrizione = data[1]
      this.image = data[2]
      console.log("img",this.image)

    })
  }
}
