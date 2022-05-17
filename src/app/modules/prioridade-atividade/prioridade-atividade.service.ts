import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrioridadeAtividade } from './prioridade-atividade.module';

@Injectable({
  providedIn: 'root'
})
export class PrioridadeAtividadeService {

  baseUrl = 'http://localhost:3000/prioridadeatividade';

  constructor(private http: HttpClient) { }

  read = (): Observable<PrioridadeAtividade[]> => this.http.get<PrioridadeAtividade[]>(this.baseUrl);
  
}
