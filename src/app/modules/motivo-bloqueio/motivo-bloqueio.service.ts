import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MotivoBloqueio } from './motivo-bloqueio.module';

@Injectable({
  providedIn: 'root'
})
export class MotivoBloqueioService {

  baseUrl = 'http://localhost:3000/motivobloqueio';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create = (motivoBloqueio: MotivoBloqueio): Observable<MotivoBloqueio> => this.http.post<MotivoBloqueio>(this.baseUrl, motivoBloqueio);

  read = (): Observable<MotivoBloqueio[]> => this.http.get<MotivoBloqueio[]>(this.baseUrl);
  
  readById(id: string): Observable<MotivoBloqueio> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<MotivoBloqueio>(url);
  }

  update(motivoBloqueio: MotivoBloqueio): Observable<MotivoBloqueio> {
    const url = `${this.baseUrl}/${motivoBloqueio.id_motivo_bloqueio}`;
    return this.http.put<MotivoBloqueio>(url, motivoBloqueio);
  }

  delete(id: string): Observable<MotivoBloqueio> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<MotivoBloqueio>(url);
  }
  
}
