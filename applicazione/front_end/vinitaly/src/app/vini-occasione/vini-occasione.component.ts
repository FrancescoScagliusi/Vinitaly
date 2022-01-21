import { Component, OnInit } from '@angular/core';
import {ViniService} from "../service/vini.service";
import {Entity} from "../model/entity";
import {OccasioneService} from "../service/occasione.service";
import {PortateService} from "../service/portate.service";
import {RegioneService} from "../service/regione.service";
import {Vino} from "../model/vino";

@Component({
  selector: 'app-vini-occasione',
  templateUrl: './vini-occasione.component.html',
  styleUrls: ['./vini-occasione.component.css']
})
export class ViniOccasioneComponent implements OnInit {

  /*
    Component per mostrare i vini di una data regione, abbinato ad un tipo di portata, bevibili in una certa occasione
  */

  constructor(private viniservice: ViniService,
              private occasioneservice: OccasioneService,
              private  portataservice: PortateService,
              private regioneservice: RegioneService) { }

  vini?: Entity[]; //elenco vini risultato della ricerca

  regioni? :Entity[]; //elenco regioni italiane nell'ontologia
  occasione? :Entity[]; //elenco occasioni nell'ontologia
  tipoPortata? :Entity[]; //elenco dei tipi di portata presenti nell'ontologia

  vino? :Vino; //uri vino di cui si vuole conoscere il dettaglio

  selectedRegione: string = "";   //regione di origine del vino scelta
  selectedTipo: string = "";  //tipo di portata  scelta
  selectedOccasione: string =  "";  //occasione scelta

  infobox: boolean = false;


  //init per avvalorare le voci dei menù regione, tipo portata e occasione
  ngOnInit(): void {
    this.regioneservice.getRegione().subscribe(data =>{
      this.regioni = data
    })

    this.occasioneservice.getOccasioni().subscribe(data =>{
      this.occasione = data
    })

    this.portataservice.getTipiPortata().subscribe(data =>{
      this.tipoPortata = data
    })
  }


  //avvalora la variabile contenente la regione selezionata dal menù
  updateRegione(e : any){
    this.infobox = false;
    this.selectedRegione = e.target.value.toString()
  }

  //avvalora la variabile contenente il tipo portata selezionato dal menù
  updateTipo(e : any){
    this.infobox = false;
    this.selectedTipo = e.target.value.toString()
  }

  //avvalora la variabile contenente l'occasione selezionata dal menù
  updateOccasione(e : any){
    this.infobox = false;
    this.selectedOccasione = e.target.value.toString()
  }


  //metodo richiamato cliccando sul tasto di ricerca, avendo selezionato una regione, un tipo portata e eventualmente una occasio, ritorna l'elenco dei vini secono questi parametri
  search(): void{
    this.infobox = false;

    console.log("Regione",this.regioni)
    console.log("Tipo",this.selectedTipo)
    console.log("Occasione",this.selectedOccasione)

    this.viniservice.findWineByOccasione(this.selectedRegione,this.selectedTipo, this.selectedOccasione).subscribe(data => {
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
    this.viniservice.getDetails(vino).subscribe(data =>{
      this.vino=data
    })
  }


}
