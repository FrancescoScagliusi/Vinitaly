import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8080/regione';

@Injectable({
  providedIn: 'root'
})
export class RegioneService {

  /*
    Service che contiene i metodi per utilizzare le API di Regione del backend
  */

  constructor(private http: HttpClient) {}

  public getRegione(): Observable<any> {
    return this.http.get<any>(API_URL);
  }


}
