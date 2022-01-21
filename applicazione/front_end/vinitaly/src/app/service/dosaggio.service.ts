import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";


const API_URL = 'http://localhost:8080/dosaggio';


@Injectable({
  providedIn: 'root'
})
export class DosaggioService {

  /*
    Service che contiene i metodi per utilizzare le API di Dosaggio del backend
  */

  constructor(private http: HttpClient) {}

  public getDosaggio(): Observable<any> {
    return this.http.get<any>(API_URL);
  }
}
