import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ted } from './ted.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TedDetails } from './components/ted-details/ted-details.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TedService {

  baseUrl = `${environment.baseUrlApi}/teds-unb`;

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

  getTedDetailsById(id: string): Observable<TedDetails[]> {
    const url = `${this.baseUrl}/teddetails/${id}`;
    return this.http.get<TedDetails[]>(url);
  }

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
