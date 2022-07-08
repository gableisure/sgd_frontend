import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrioridadeAtividade } from './prioridade-atividade.module';

@Injectable({
  providedIn: 'root'
})
export class PrioridadeAtividadeService {

  baseUrl = `${environment.baseUrlApi}/prioridades-atividade`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
      panelClass: ['snakbar-msg-success', 'snakbar-success']
    })
  }

  create = (prioridadeAtividade: PrioridadeAtividade): Observable<PrioridadeAtividade> => this.http.post<PrioridadeAtividade>(this.baseUrl, prioridadeAtividade);

  read = (): Observable<PrioridadeAtividade[]> => this.http.get<PrioridadeAtividade[]>(this.baseUrl);

  readById(id: string): Observable<PrioridadeAtividade> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<PrioridadeAtividade>(url);
  }

  update(prioridadeAtividade: PrioridadeAtividade): Observable<PrioridadeAtividade> {
    const url = `${this.baseUrl}/${prioridadeAtividade.id_prioridade_atividade}`;
    return this.http.put<PrioridadeAtividade>(url, prioridadeAtividade);
  }

  formatDateToISODate = (date: string) => new Date(date).toISOString().substring(0, 10);

}
