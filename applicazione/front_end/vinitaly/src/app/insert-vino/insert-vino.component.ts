import { Component, OnInit } from '@angular/core';
import {Entity} from "../model/entity";
import {ViniService} from "../service/vini.service";
import {RegioneService} from "../service/regione.service";
import {CantinaService} from "../service/cantina.service";
import {VitignoService} from "../service/vitigno.service";
import {AromaService} from "../service/aroma.service";
import {DosaggioService} from "../service/dosaggio.service";
import {Vino} from "../model/vino";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-insert-vino',
  templateUrl: './insert-vino.component.html',
  styleUrls: ['./insert-vino.component.css']
})
export class InsertVinoComponent implements OnInit {

  /*
  Componente che contiene un form per permettere l'inserimento di un nuovo vino
   */

  //struttura che contiene i valori delle variabili del form
  form: any = {
    denominazione: null,
    prezzo: null,
    pressione: null,
    grado: null,
    annata: null,
    cantina:null,
    aroma: null,
    dosaggio: null,
    vitigno: null,
    origine: null,
    colore: null,
    struttura: null
  };



  //voci di menù dei colori di un vino (con label e uri)
  colori: Entity[] = [
    new Entity("Rosso",":VinoRosso"),
    new Entity("Bianco",":VinoBianco"),
    new Entity("Rosato",":VinoRosato")
  ];

  //voci di menù della struttura di un vino (con label e uri)
  strutture: Entity[] =
    [
      new Entity("Leggero",":VinoLeggero"),
      new Entity("Medio Corpo",":VinoDiMedioCorpo"),
      new Entity("Corpo",":VinoDiCorpo"),
      new Entity("Grande Struttura",":VinoDiGrandeStruttura")
    ];

  dosaggi?: Entity[]; //elenco dei dosaggi di un vino presenti nell'ontologia
  vitigni?: Entity[]; //elenco dei vitigni presenti nell'ontologia
  regioni?: Entity[]; //elenco delle regioni italiane nell'ontologia
  aromi?:   Entity[]; //elenco degli aromi di un vino presenti nell'ontologia
  momenti?: Entity[]; //elenco dei momenti in cui bere un vino presenti nell'ontologia
  cantine?: Entity[]; //elenco delle cantine i presenti nell'ontologia


  selectedVitigno:   string = ""; //contiene il vitigno selezionato dal menù
  selectedCantina:   string = ""; //contiene la cantina selezionata dal menù
  selectedAroma:     string = ""; //contiene l'aroma selezionato dal menù
  selectedColore:    string = ""; //contiene il colore selezionato dal menù
  selectedStruttura: string = ""; //contiene la struttura selezionata dal menù
  selectedDosaggio:  string = ""; //contiene il dosaggio selezionato dal menù
  selectedRegione:   string = ""; //contiene la regione selezionata dal menù



  constructor(private viniservice: ViniService,
              private vitignoservice: VitignoService,
              private cantinaservice: CantinaService,
              private regioneservice: RegioneService,
              private aromaservice: AromaService,
              private dosaggioservice: DosaggioService) { }

  //init per avvalorare le voci dei menù del form
  ngOnInit(): void {
    this.regioneservice.getRegione().subscribe(data =>{
      this.regioni = data
    })

    this.cantinaservice.getCantina().subscribe(data =>{
      this.cantine = data
    })

    this.vitignoservice.getVitigno().subscribe(data =>{
      this.vitigni = data
    })

    this.dosaggioservice.getDosaggio().subscribe(data =>{
      this.dosaggi = data
    })

    this.aromaservice.getAroma().subscribe(data =>{
      this.aromi = data
    })
  }


  updateRegione(e : any){
    this.selectedRegione = e.target.value.toString()
  }

  updateCantina(e : any){
    this.selectedCantina = e.target.value.toString()
  }

  updateAroma(e : any){
    this.selectedAroma = e.target.value.toString()
  }

  updateDosaggio(e : any){
    this.selectedDosaggio = e.target.value.toString()
  }

  updateVitigno(e : any){
    this.selectedVitigno = e.target.value.toString()
  }

  updateStruttura(e : any){
    this.selectedStruttura = e.target.value.toString()
  }

  updateColore(e : any){
    this.selectedColore = e.target.value.toString()
  }

  //metodo che una volta cliccato sul tasto "CREA VINO", richiama il metodo di creazione con tutti i valori inseriti nel form
  create(){

    const {
      name,
      prezzo,
      pressione,
      grado,
      annata,
      cantina,
      aroma,
      dosaggio,
      vitigno,
      origine,
      colore,
      struttura } = this.form;

    var sel_aroma : string[] = [this.selectedAroma];
    var sel_vitigno : string[] = [this.selectedVitigno];


    var vino: Vino =  new Vino
    ( this.form.name,
      sel_aroma,
      this.selectedRegione,
      this.form.grado,
      this.form.pressione,
      this.form.annata,
      this.form.prezzo,
      this.selectedDosaggio,
      this.selectedCantina,
      sel_vitigno,
      this.selectedColore,
      this.selectedStruttura)


    this.viniservice.createWine(this.form.name,
      sel_aroma,
      this.selectedRegione,
      this.form.grado,
      this.form.pressione,
      this.form.annata,
      this.form.prezzo,
      this.selectedDosaggio,
      this.selectedCantina,
      sel_vitigno,
      this.selectedColore,
      this.selectedStruttura).subscribe(data => {
        console.log(data);
        this.form.reset();
      },
        err => {
        console.log(err.error.message);
      }
    );

  }
}
