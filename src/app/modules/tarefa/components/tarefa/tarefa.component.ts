import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../tarefa.module';
import { TarefaService } from '../../tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {

  displayedColumns = [
    'id_tarefa',
    'id_ted',
    'id_etapa',
    'id_atividade_etapa',
    'id_atividade_backlog',
    'ds_tarefa',
    'id_tarefa_pai',
    'id_solicitante',
    'id_responsavel',
    'id_situacao_tarefa',
    'nr_regra_negocio',
    'nr_historia_usuario',
    'dt_inicio_tarefa',
    'dt_fim_tarefa',
    'dt_inclusao'
  ];
  tarefa: Tarefa[] = []

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.tarefaService.read().subscribe(tarefa => {
      this.tarefa = tarefa;
    });
  }

}
