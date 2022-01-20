import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ElencoViniComponent } from './elenco-vini/elenco-vini.component';
import { ElencoVinoAbbinamentoComponent } from './elenco-abbinamento/elenco-abbinamento.component';
import { ViniSomigliantiComponent } from './vini-somiglianti/vini-somiglianti.component';
import { ViniOccasioneComponent } from './vini-occasione/vini-occasione.component';
import { ViniCantinaComponent } from './vini-cantina/vini-cantina.component';
import { InsertVinoComponent } from './insert-vino/insert-vino.component';
import { ViniRegioneComponent } from './vini-regione/vini-regione.component';

@NgModule({
  declarations: [
    AppComponent,
    ElencoViniComponent,
    ElencoVinoAbbinamentoComponent,
    ViniSomigliantiComponent,
    ViniOccasioneComponent,
    ViniCantinaComponent,
    InsertVinoComponent,
    ViniRegioneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
