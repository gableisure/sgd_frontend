import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sprint } from './sprint.module';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  baseUrl = `${environment.baseUrlApi}/sprints`;

  constructor(private http: HttpClient) { }

  read = (): Observable<Sprint[]> => this.http.get<Sprint[]>(this.baseUrl);

}
