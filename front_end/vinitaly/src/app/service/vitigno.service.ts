import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8080/vitigno';

@Injectable({
  providedIn: 'root'
})
export class VitignoService {
  /*
    Service che contiene i metodi per utilizzare le API di Vitigno del backend
  */

  constructor(private http: HttpClient) {}

  public getVitigno(): Observable<any> {
    return this.http.get<any>(API_URL);
  }
}
