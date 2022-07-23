import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtividadeBacklogDetalheService {

  constructor() { }

  formatDateToISODate = (date: string) => new Date(date).toISOString().substring(0, 10);
}
