import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ElencoViniComponent} from "./elenco-vini/elenco-vini.component";
import {ElencoVinoAbbinamentoComponent} from "./elenco-abbinamento/elenco-abbinamento.component";
import {ViniSomigliantiComponent} from "./vini-somiglianti/vini-somiglianti.component";
import {ViniOccasioneComponent} from "./vini-occasione/vini-occasione.component";
import {ViniCantinaComponent} from "./vini-cantina/vini-cantina.component";
import {InsertVinoComponent} from "./insert-vino/insert-vino.component";
import {ViniRegioneComponent} from "./vini-regione/vini-regione.component";

const routes: Routes = [
  { path: 'elenco', component: ElencoViniComponent },
  { path: 'portata', component: ElencoVinoAbbinamentoComponent },
  { path: 'somiglia', component: ViniSomigliantiComponent },
  { path: 'occasione', component: ViniOccasioneComponent },
  { path: 'cantina', component: ViniCantinaComponent },
  { path: 'insert', component: InsertVinoComponent },
  { path: 'regione', component: ViniRegioneComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
