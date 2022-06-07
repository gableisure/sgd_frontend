import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AtividadeBacklog } from './atividade-backlog.module';

@Injectable({
  providedIn: 'root'
})
export class AtividadeBacklogService {

  baseUrl = `${environment.baseUrlApi}/atividades-backlog`;

  constructor(private http: HttpClient) { }

  read = (): Observable<AtividadeBacklog[]> => this.http.get<AtividadeBacklog[]>(this.baseUrl);
  
}
