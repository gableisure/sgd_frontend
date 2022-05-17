import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SituacaoAtividade } from './situacao-atividade.module';

@Injectable({
  providedIn: 'root'
})
export class SituacaoAtividadeService {

  baseUrl = 'http://localhost:3000/situacaoatividade';

  constructor(private http: HttpClient) { }

  read = (): Observable<SituacaoAtividade[]> => this.http.get<SituacaoAtividade[]>(this.baseUrl);
  
}
