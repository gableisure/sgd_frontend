import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AtividadeEtapaEap } from 'src/app/modules/atividade-etapa-eap/atividade-etapa-eap.module';
import { EtapaEap } from 'src/app/modules/etapa-eap/etapa-eap.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TedDetalheService {

  private _baseUrlEtapaEap = `${environment.baseUrlApi}/etapas-eap`;
  private _baseUrlAtividadeEtapaEap = `${environment.baseUrlApi}/atividades-etapa`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
      panelClass: ['snakbar-msg-success', 'snakbar-success']
    })
  }

  readAtividadeEtapaEapByIdEtapa(idEtapa: string): Observable<any[]> {
    const url = `${this._baseUrlAtividadeEtapaEap}/etapa/${idEtapa}`;
    return this.http.get<any[]>(url);
  }
  
  formatDateToISODate = (date: string) => new Date(date).toISOString().substring(0, 10);
  
}
