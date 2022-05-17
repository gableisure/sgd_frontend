import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SituacaoTarefa } from './situacao-tarefa.module';

@Injectable({
  providedIn: 'root'
})
export class SituacaoTarefaService {

  baseUrl = 'http://localhost:3000/situacaotarefa';

  constructor(private http: HttpClient) { }

  read = (): Observable<SituacaoTarefa[]> => this.http.get<SituacaoTarefa[]>(this.baseUrl);
  
  readById(id: string): Observable<SituacaoTarefa> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<SituacaoTarefa>(url);
  }
  
}
