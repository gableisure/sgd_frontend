import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ted } from './ted.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/modules/usuario/usuario.module';
import { Tarefa } from '../tarefa/tarefa.module';

@Injectable({
  providedIn: 'root'
})
export class TedService {

  baseUrl = `${environment.baseUrlApi}/teds-unb`;
  baseUrlUsuario = `${environment.baseUrlApi}/usuarios/ted`;
  baseUrlTarefas = `${environment.baseUrlApi}/tarefas`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
      panelClass: ['snakbar-msg-success', 'snakbar-success']
    })
  }

  create = (ted: Ted): Observable<Ted> => this.http.post<Ted>(this.baseUrl, ted);

  read = (): Observable<Ted[]> => this.http.get<Ted[]>(this.baseUrl);
  
  readById(id: string): Observable<Ted> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Ted>(url);
  }

  getUsuariosByIdTed(id: number): Observable<Usuario[]> {
    const url = `${this.baseUrlUsuario}/${id}`;
    return this.http.get<Usuario[]>(url);
  }

  getAllTarefas = (): Observable<Tarefa[]> => this.http.get<Tarefa[]>(this.baseUrl);

  update(ted: Ted): Observable<Ted> {
    const url = `${this.baseUrl}/${ted.id_ted}`;
    return this.http.put<Ted>(url, ted);
  }

  delete(id: string): Observable<Ted> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Ted>(url);
  }

  formatDateToISODate = (date: string) => new Date(date).toISOString().substring(0, 10);

}
