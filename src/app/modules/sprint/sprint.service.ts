import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sprint } from './sprint.module';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  baseUrl = 'http://localhost:3000/sprint';

  constructor(private http: HttpClient) { }

  read = (): Observable<Sprint[]> => this.http.get<Sprint[]>(this.baseUrl);

}
