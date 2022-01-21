import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8080/cantina';


@Injectable({
  providedIn: 'root'
})
export class CantinaService {

  /*
    Service che contiene i metodi per utilizzare le API di Cantina del backend
  */

  constructor(private http: HttpClient) {}

  public getCantina(): Observable<any> {
    return this.http.get<any>(API_URL);
  }
}
