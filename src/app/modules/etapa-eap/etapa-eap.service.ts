import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EtapaEap } from './etapa-eap.module';

@Injectable({
  providedIn: 'root'
})
export class EtapaEapService {

  baseUrl = `${environment.baseUrlApi}/etapas-eap`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
      panelClass: ['snakbar-msg-success', 'snakbar-success']
    })
  }

  create = (etapaEap: EtapaEap): Observable<EtapaEap> => this.http.post<EtapaEap>(this.baseUrl, etapaEap);

  read = (): Observable<EtapaEap[]> => this.http.get<EtapaEap[]>(this.baseUrl);
  
  readById(id: string): Observable<EtapaEap> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<EtapaEap>(url);
  }

  update(etapaEap: EtapaEap): Observable<EtapaEap> {
    const url = `${this.baseUrl}/${etapaEap.id_etapa}`;
    return this.http.put<EtapaEap>(url, etapaEap);
  }

  delete(id: string): Observable<EtapaEap> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<EtapaEap>(url);
  }
  
  formatDateToISODate = (date: string) => new Date(date).toISOString().substring(0, 10);

}
