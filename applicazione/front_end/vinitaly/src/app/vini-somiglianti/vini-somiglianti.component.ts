import { Component, OnInit } from '@angular/core';
import {ViniService} from "../service/vini.service";
import {Entity} from "../model/entity";
import {PortateService} from "../service/portate.service";
import {Vino} from "../model/vino";

@Component({
  selector: 'app-vini-somiglianti',
  templateUrl: './vini-somiglianti.component.html',
  styleUrls: ['./vini-somiglianti.component.css']
})
export class ViniSomigliantiComponent implements OnInit {

  constructor(private viniservice: ViniService) { }

  vini?: Entity[]; //vini risultato della query

  wines? :Entity[]; //elenco dei vini presenti nell'ontologia



  selectedVino: string =  ""; //vino scelto per scorpire la somiglianza

  vino? :Vino; //uri vino di cui si vuole conoscere il dettaglio
  infobox: boolean = false;


  //init per avvalorare le voci del menù vini
  ngOnInit(): void {
    this.viniservice.getAllWine().subscribe(data =>{
      this.wines = data
    })

  }

  //avvalora la variabile contenente il vino selezionato dal menù
  updateVino(e : any){
    this.selectedVino = e.target.value.toString()
  }


  //metodo richiamato cliccando sul tasto di ricerca, avendo selezionato un vino, ritorna l'elenco dei vini somiglianti
  search(): void{
    console.log("Vino",this.selectedVino)
    this.infobox = false
    this.viniservice.findWineBySomiglianza(this.selectedVino).subscribe(data => {
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
