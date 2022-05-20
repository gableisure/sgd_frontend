import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SituacaoAtividade } from './situacao-atividade.module';

@Injectable({
  providedIn: 'root'
})
export class SituacaoAtividadeService {

  baseUrl = 'http://localhost:3000/situacaoatividade';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
      panelClass: ['snakbar-msg-success', 'snakbar-success']
    })
  }

  create = (situacaoAtividade: SituacaoAtividade): Observable<SituacaoAtividade> => this.http.post<SituacaoAtividade>(this.baseUrl, situacaoAtividade);

  read = (): Observable<SituacaoAtividade[]> => this.http.get<SituacaoAtividade[]>(this.baseUrl);

  readById(id: string): Observable<SituacaoAtividade> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<SituacaoAtividade>(url);
  }

  update(situacaoAtividade: SituacaoAtividade): Observable<SituacaoAtividade> {
    const url = `${this.baseUrl}/${situacaoAtividade.id_situacao_atividade}`;
    return this.http.put<SituacaoAtividade>(url, situacaoAtividade);
  }
  
}
