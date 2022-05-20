import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SituacaoTarefa } from './situacao-tarefa.module';

@Injectable({
  providedIn: 'root'
})
export class SituacaoTarefaService {

  baseUrl = 'http://localhost:3000/situacaotarefa';


  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
      panelClass: ['snakbar-msg-success', 'snakbar-success']
    })
  }

  create = (situacaoTarefa: SituacaoTarefa): Observable<SituacaoTarefa> => this.http.post<SituacaoTarefa>(this.baseUrl, situacaoTarefa);

  read = (): Observable<SituacaoTarefa[]> => this.http.get<SituacaoTarefa[]>(this.baseUrl);

  readById(id: string): Observable<SituacaoTarefa> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<SituacaoTarefa>(url);
  }

  update(situacaoTarefa: SituacaoTarefa): Observable<SituacaoTarefa> {
    const url = `${this.baseUrl}/${situacaoTarefa.id_situacao_tarefa}`;
    return this.http.put<SituacaoTarefa>(url, situacaoTarefa);
  }
  
}
