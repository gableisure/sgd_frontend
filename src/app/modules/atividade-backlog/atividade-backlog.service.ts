import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtividadeBacklog } from './atividade-backlog.module';

@Injectable({
  providedIn: 'root'
})
export class AtividadeBacklogService {

  baseUrl = 'http://localhost:3000/atividadebacklog';

  constructor(private http: HttpClient) { }

  read = (): Observable<AtividadeBacklog[]> => this.http.get<AtividadeBacklog[]>(this.baseUrl);
  
}
