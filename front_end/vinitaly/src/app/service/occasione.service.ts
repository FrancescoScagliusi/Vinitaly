import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8080/occasione';

@Injectable({
  providedIn: 'root'
})
export class OccasioneService {

  /*
    Service che contiene i metodi per utilizzare le API di Occasione del backend
  */

  constructor(private http: HttpClient) {}


  public getOccasioni(): Observable<any> {
    return this.http.get<any>(API_URL);
  }

}
