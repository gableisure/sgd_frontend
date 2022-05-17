import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { PerfilUsuario } from './perfil-usuario.module';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {

  baseUrl = 'http://localhost:3000/perfilusuario';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create = (perfilUsuario: PerfilUsuario): Observable<PerfilUsuario> => this.http.post<PerfilUsuario>(this.baseUrl, perfilUsuario);

  read = (): Observable<PerfilUsuario[]> => this.http.get<PerfilUsuario[]>(this.baseUrl);

  readById(id: string): Observable<PerfilUsuario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<PerfilUsuario>(url);
  }

  update(perfilUsuario: PerfilUsuario): Observable<PerfilUsuario> {
    const url = `${this.baseUrl}/${perfilUsuario.id_perfil_usuario}`;
    return this.http.put<PerfilUsuario>(url, perfilUsuario);
  }

}
