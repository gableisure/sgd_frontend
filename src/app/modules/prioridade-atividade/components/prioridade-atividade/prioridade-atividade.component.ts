import { Component, OnInit } from '@angular/core';
import { PrioridadeAtividade } from '../../prioridade-atividade.module';
import { PrioridadeAtividadeService } from './../../prioridade-atividade.service';

@Component({
  selector: 'app-prioridade-atividade',
  templateUrl: './prioridade-atividade.component.html',
  styleUrls: ['./prioridade-atividade.component.css']
})
export class PrioridadeAtividadeComponent implements OnInit {

  displayedColumns = ['id_prioridade_atividade', 'ds_prioridade_atividade'];
  prioridadeAtividade: PrioridadeAtividade[] = []

  constructor(private prioridadeAtividadeService: PrioridadeAtividadeService) { }

  ngOnInit(): void {
    this.prioridadeAtividadeService.read().subscribe(prioridadeAtividade => {
      this.prioridadeAtividade = prioridadeAtividade;
    });
  }

}
