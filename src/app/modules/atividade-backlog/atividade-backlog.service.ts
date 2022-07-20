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

  create = (atividadeBacklog: AtividadeBacklog): Observable<AtividadeBacklog> => this.http.post<AtividadeBacklog>(this.baseUrl, atividadeBacklog);

  read = (): Observable<any[]> => this.http.get<any[]>(this.baseUrl);

  update(atividadeBacklog: any): Observable<any> {
    const url = `${this.baseUrl}/${atividadeBacklog.id_atividade}`;
    return this.http.put<any>(url, atividadeBacklog);
  }

}
