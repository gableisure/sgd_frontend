import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AtividadeEtapaEap } from './atividade-etapa-eap.module';

@Injectable({
  providedIn: 'root'
})
export class AtividadeEtapaEapService {

  baseUrl = `${environment.baseUrlApi}/atividades-etapa`;

  constructor(private http: HttpClient) { }

  read = (): Observable<AtividadeEtapaEap[]> => this.http.get<AtividadeEtapaEap[]>(this.baseUrl);
}
