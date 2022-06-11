import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarefa } from './tarefa.module';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  baseUrl = `${environment.baseUrlApi}/tarefas`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  read = (): Observable<Tarefa[]> => this.http.get<Tarefa[]>(this.baseUrl);
  
  readById(id: string): Observable<Tarefa> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Tarefa>(url);
  }

  updateSituacaoTarefa(tarefa: Tarefa): Observable<Tarefa> {
    const url = `${this.baseUrl}/${tarefa.id_tarefa}`;
    return this.http.put<Tarefa>(url, tarefa);
  }
  
  formatDateToISODate = (date: string) => new Date(date).toISOString().substring(0, 10);
}
