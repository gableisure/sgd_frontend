import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TarefaObservador } from './tarefa-observador.module';

@Injectable({
  providedIn: 'root'
})
export class TarefaObservadorService {

  baseUrl = 'http://localhost:3000/tarefaobservador';
  /* baseUrl = `${environment.baseUrlApi}/tarefas-observador`; */

  constructor(private http: HttpClient) { }

  read = (): Observable<TarefaObservador[]> => this.http.get<TarefaObservador[]>(this.baseUrl);
  
  readById(id: string): Observable<TarefaObservador> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<TarefaObservador>(url);
  }
  
}
