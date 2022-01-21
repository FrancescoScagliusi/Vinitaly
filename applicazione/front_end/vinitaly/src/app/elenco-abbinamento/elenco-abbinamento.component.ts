import { Component, OnInit } from '@angular/core';
import {ViniService} from "../service/vini.service";
import {Entity} from "../model/entity";
import {PortateService} from "../service/portate.service";
import {Vino} from "../model/vino";

@Component({
  selector: 'app-elenco-abbinamento',
  templateUrl: './elenco-abbinamento.component.html',
  styleUrls: ['./elenco-abbinamento.component.css']
})
export class ElencoVinoAbbinamentoComponent implements OnInit {

  /*
  Component per mostrare i vini abbinati ad una pietanza scelta da menù
   */

  constructor(private viniservice: ViniService, private portateservice: PortateService) { }

  vini?: Entity[]; //elenco vini risultato della ricerca
  portate? :Entity[]; //elenco delle portate disponibili sull'ontologia



  selectedPietanza: string =  ""; //pietanza selezionata dal menù

  vino? :Vino; //vino selezionato per mostrare i dettagli

  infobox: boolean = false; //per visualizzare o meno l'infobox con i dettagli del vino


  //init per avvalorare le voci del menù portata
  ngOnInit(): void {
    this.portateservice.getPortate().subscribe(data =>{
      this.portate = data
    })
  }

  //avvalora la variabile contenente la pietanza selezionata dal menù
  updatePietanza(e : any){
    this.selectedPietanza = e.target.value.toString()
  }


  //metodo richiamato cliccando sul tasto di ricerca, avendo selezionato una pietanza, ritorna l'elenco dei vini abbinati

  search(): void{
    this.infobox = false
    console.log("Pietanza",this.selectedPietanza)

    this.viniservice.findWineByPortata(this.selectedPietanza).subscribe(data => {
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
