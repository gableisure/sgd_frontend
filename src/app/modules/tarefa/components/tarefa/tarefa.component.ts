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
    'ds_etapa',
    'ds_atividade_etapa',
    'ds_atividade_backlog',
    'ds_tarefa',
    'ds_situacao_tarefa',
    'nr_regra_negocio',
    'nr_historia_usuario',
    'dt_inicio_vigencia',
    'dt_fim_vigencia',
    'dt_inclusao'
  ];
  tarefa: Tarefa[] = []

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.tarefaService.read().subscribe(tarefa => {
      this.tarefa = tarefa;
      console.log(this.tarefa);
      this.tarefa.forEach(tarefa => {
        if (tarefa.dt_fim_vigencia != null) tarefa.dt_fim_vigencia = this.tarefaService.formatDateToISODate(tarefa.dt_fim_vigencia);
        if (tarefa.dt_inicio_vigencia != null) tarefa.dt_inicio_vigencia = this.tarefaService.formatDateToISODate(tarefa.dt_inicio_vigencia);
        tarefa.dt_inclusao = this.tarefaService.formatDateToISODate(tarefa.dt_inclusao);
      });
      
    });
  }

}
