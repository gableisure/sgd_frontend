import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SituacaoTarefa } from '../../../situacao-tarefa/situacao-tarefa.module';
import { SituacaoTarefaService } from '../../../situacao-tarefa/situacao-tarefa.service';
import { Tarefa } from '../../tarefa.module';
import { TarefaService } from '../../tarefa.service';

@Component({
  selector: 'app-tarefa-details-dialog',
  templateUrl: './tarefa-details-dialog.component.html',
  styleUrls: ['./tarefa-details-dialog.component.css']
})
export class TarefaDetailsDialogComponent implements OnInit {

  @Input() id_tarefa: string = '';
  
  tarefa: Tarefa = {
    id_tarefa: 0,
    id_ted: 0,
    ds_ted: '',
    id_etapa: 0,
    ds_etapa: '',
    ds_tarefa: '',
    tb_situacao_tarefa: '',
    tb_atividade_backlog: '',
    nr_regra_negocio: '',
    nr_historia_usuario: '',
    tx_observacao: '',
    dt_inicio_vigencia: '',
    dt_fim_vigencia: '',
    dt_inclusao: ''
  }
  
  situacaoTarefa: SituacaoTarefa[] = [];
  
  constructor(private tarefaService: TarefaService, private situacaoTarefaService: SituacaoTarefaService, public dialogRef: MatDialogRef<TarefaDetailsDialogComponent>) { }

  ngOnInit(): void {

    this.tarefaService.readById(this.id_tarefa).subscribe(tarefa => {
      this.tarefa = tarefa;
    });

    this.situacaoTarefaService.read().subscribe(situacaoTarefa => {
      this.situacaoTarefa = situacaoTarefa;
    });
    
  }

  /* updateSituacaoTarefa(id_tarefa: number, situacaoTarefa: SituacaoTarefa): void {
    this.tarefaService.readById(String(id_tarefa)).subscribe(tarefa => {
      this.tarefa = tarefa;
      this.tarefa.id_situacao_tarefa = situacaoTarefa.id_situacao_tarefa;
      this.tarefaService.updateSituacaoTarefa(this.tarefa).subscribe(newTarefa => {
        this.tarefaService.showMessage('Status da tarefa alterado com sucesso')
        window.location.reload();
      })
    });
  } */

  closeDialog(): void {
    this.dialogRef.close();
  }
  
}
