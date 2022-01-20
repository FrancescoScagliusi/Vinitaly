import { Component, OnInit } from '@angular/core';
import {ViniService} from "../service/vini.service";
import {Entity} from "../model/entity";
import {NgForm} from "@angular/forms";
import {Vino} from "../model/vino";

@Component({
  selector: 'app-elenco-vini',
  templateUrl: './elenco-vini.component.html',
  styleUrls: ['./elenco-vini.component.css']
})
export class ElencoViniComponent implements OnInit {

  /*
  Component per mostrare i vini data una certa struttura e un certo colore di vino
 */

  constructor(private viniservice: ViniService) { }

  vini?: Entity[]; //elenco vini risultato della ricerca
  colori? :Entity[]; //elenco colori di vino disponibili
  strutture? :Entity[]; //elenco strutture di vino disponibili



  selectedStruttura: string =  ""; //struttura vino scelta
  selectedColore: string = ""; //colore vino scelto

  vino? :Vino; //uri vino di cui si vuole conoscere il dettaglio
  infobox: boolean = false;


  //init per avvalorare le voci dei menù struttura e colore vino
  ngOnInit(): void {
    this.viniservice.getColori().subscribe(data =>{
      this.colori = data
    })

    this.viniservice.getStrutture().subscribe(data =>{
      this.strutture = data
    })
  }

  //avvalora la variabile contenente la struttura selezionata dal menù
  updateStruttura(e : any){
    this.selectedStruttura = e.target.value.toString()
  }

  //avvalora la variabile contenente il colore selezionato dal menù
  updateColore(e : any){
    this.selectedColore = e.target.value.toString()
  }


  //metodo richiamato cliccando sul tasto di ricerca, avendo selezionato una struttura e un colore, ritorna l'elenco dei vini corrispondenti
  search(): void{
    this.infobox = false
    console.log("Struttura",this.selectedStruttura)
    console.log("Colore",this.selectedColore)

    this.viniservice.findWine(this.selectedStruttura, this.selectedColore).subscribe(data => {
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
