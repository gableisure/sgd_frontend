import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.module';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  /* TODO */
  /* create = (usuario: Usuario): Observable<Usuario> => this.http.post<Usuario>(this.baseUrl, usuario); */

  read = (): Observable<Usuario[]> => this.http.get<Usuario[]>(this.baseUrl);

  getUsersByIdTed(id_ted: string): Observable<Usuario[]> {
    const url = `${this.baseUrl}/ted/${id_ted}`;
    return this.http.get<Usuario[]>(url); 
  }
}
