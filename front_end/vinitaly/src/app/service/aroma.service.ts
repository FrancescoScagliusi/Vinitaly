import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";


const API_URL = 'http://localhost:8080/aroma';


@Injectable({
  providedIn: 'root'
})
export class AromaService {

  /*
    Service che contiene i metodi per utilizzare le API di Aroma del backend
  */

  constructor(private http: HttpClient) {}

  //ritorna la GET di API_URL
  public getAroma(): Observable<any> {
    return this.http.get<any>(API_URL);
  }
}
