import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Vino} from "../model/vino";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = 'http://localhost:8080/vini/';

@Injectable({
  providedIn: 'root'
})
export class ViniService {

  /*
    Service che contiene i metodi per utilizzare le API di Vino del backend
  */

  constructor(private http: HttpClient) {}


  public findWine(struttura : string, colore: string): Observable<any> {
    return this.http.get<any>(API_URL + "vino" ,{  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) ,params:{struttura, colore}});
  }

  public findWineByPortata(portata: string) : Observable<any>{
    return this.http.get<any>(API_URL + "vino_abbinamento" ,{  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) ,params:{portata}});
  }

  public findWineBySomiglianza(vino: string) : Observable<any>{
    return this.http.get<any>(API_URL + "somiglia" ,{  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) ,params:{vino}});
  }

  public findWineByOccasione(regione: string, tipoPortata : string, occasione: string): Observable<any> {
    return this.http.get<any>(API_URL + "vino_occasione" ,{  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) ,params:{regione, tipoPortata, occasione}});
  }

  public findWineByCantina(cantina: string) : Observable<any>{
    return this.http.get<any>(API_URL + "cantina" ,{  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) ,params:{cantina}});
  }

  public findWineByRegione(regione: string) : Observable<any>{
    return this.http.get<any>(API_URL + "regione" ,{  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) ,params:{regione}});
  }

  public getDetails(vino: string):Observable<any> {
    return this.http.get<any>(API_URL + "details",{  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) ,params:{vino}});
  }

  public getDetailsWiki(vino: string):Observable<any> {
    return this.http.get<any>(API_URL + "detailswiki",{  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) ,params:{vino}});
  }

  public getAllWine():Observable<any> {
    return this.http.get<any>(API_URL + "all");
  }

  public getStrutture():Observable<any> {
    return this.http.get<any>(API_URL + "strutture");
  }

  public getColori():Observable<any> {
    return this.http.get<any>(API_URL + "colori");
  }

  public createWine(name: string, aroma: string[], origine: string, grado: string, pressione: string, annata: string, prezzo: string, dosaggio: string, cantina: string, vitigno: string[], colore: string, struttura: string): Observable<any> {
    return this.http.post(API_URL + "create",{name,aroma,origine,grado,pressione,annata,prezzo,dosaggio,cantina,vitigno,colore,struttura});
  }

}
