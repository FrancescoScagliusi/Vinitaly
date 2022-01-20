import { Component, OnInit } from '@angular/core';
import {ViniService} from "../service/vini.service";
import {CantinaService} from "../service/cantina.service";
import {Entity} from "../model/entity";
import {Vino} from "../model/vino";

@Component({
  selector: 'app-vini-cantina',
  templateUrl: './vini-cantina.component.html',
  styleUrls: ['./vini-cantina.component.css']
})
export class ViniCantinaComponent implements OnInit {

  /*
    Component per mostrare i vini appartenenti ad una certa cantina
  */

  vini?: Entity[]; //risultato ricerca

  cantine? :Entity[]; //cantine per menu

  selectedCantina: string =  ""; //cantina selezionata

  vino? :Vino; //vino cliccato per info

  infobox: boolean = false;

  constructor(private viniservice: ViniService,
              private cantinaservice: CantinaService) { }

  //init per valorizzare le voci del menù cantina
  ngOnInit(): void {
    this.cantinaservice.getCantina().subscribe(data =>{
      this.cantine = data
    })

  }

  //avvalora la variabile contenente la cantina selezionata dal menù
  updateCantina(e : any){
    this.selectedCantina = e.target.value.toString()
    this.infobox = false;
  }

  //metodo richiamato cliccando sul tasto di ricerca, avendo selezionato una cantina , ritorna l'elenco dei vini contenuti al suo interno
  search(): void{
    console.log("Cantina",this.selectedCantina)
    this.infobox = false;

    this.viniservice.findWineByCantina(this.selectedCantina).subscribe(data => {
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
