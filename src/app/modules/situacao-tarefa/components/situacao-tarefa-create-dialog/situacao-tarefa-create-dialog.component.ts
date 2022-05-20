import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SituacaoTarefa } from '../../situacao-tarefa.module';
import { SituacaoTarefaService } from '../../situacao-tarefa.service';

@Component({
  selector: 'app-situacao-tarefa-create-dialog',
  templateUrl: './situacao-tarefa-create-dialog.component.html',
  styleUrls: ['./situacao-tarefa-create-dialog.component.css']
})
export class SituacaoTarefaCreateDialogComponent implements OnInit {

  titleDialog: string = 'Criar situação da tarefa';

  situacaoTarefa: SituacaoTarefa = {
    id_situacao_tarefa: 0,
    ds_situacao_tarefa: '',
    dt_inicio: '',
    dt_fim: '',
    status: true
  }

  constructor(private situacaoTarefaService: SituacaoTarefaService, public dialogRef: MatDialogRef<SituacaoTarefaCreateDialogComponent>) { }

  ngOnInit(): void {
  }

  createSituacaoTarefa(): void {
    this.situacaoTarefaService.create(this.situacaoTarefa).subscribe(() => {
      this.dialogRef.close();
      this.situacaoTarefaService.showMessage('Situação da tarefa criada com sucesso!');
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
