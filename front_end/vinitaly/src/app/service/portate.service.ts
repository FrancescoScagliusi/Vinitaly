import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = 'http://localhost:8080/portata';

@Injectable({
  providedIn: 'root'
})
export class PortateService {

  /*
    Service che contiene i metodi per utilizzare le API di Portata del backend
  */

  constructor(private http: HttpClient) {}


  public getPortate():Observable<any> {
    return this.http.get<any>(API_URL);
  }

  public getTipiPortata():Observable<any> {
    return this.http.get<any>(API_URL  + "/tipi");
  }


}
