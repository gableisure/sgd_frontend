import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SituacaoTarefa } from '../../situacao-tarefa.module';
import { SituacaoTarefaService } from '../../situacao-tarefa.service';

@Component({
  selector: 'app-situacao-tarefa-update-dialog',
  templateUrl: './situacao-tarefa-update-dialog.component.html',
  styleUrls: ['./situacao-tarefa-update-dialog.component.css']
})
export class SituacaoTarefaUpdateDialogComponent implements OnInit {

  @Input() id_situacao_tarefa: string = '';

  titleDialog: string = 'Editar situação da tarefa';

  situacaoTarefa: SituacaoTarefa = {
    id_situacao_tarefa: 0,
    ds_situacao_tarefa: '',
    dt_inicio: '',
    dt_fim: '',
    status: true
  }
 
  constructor(private situacaoTarefaService: SituacaoTarefaService, public dialogRef: MatDialogRef<SituacaoTarefaUpdateDialogComponent>) { }

  ngOnInit(): void {
    this.situacaoTarefaService.readById(this.id_situacao_tarefa).subscribe((situacaoTarefa) => {
      this.situacaoTarefa = situacaoTarefa;
    });
  }

  updateSituacaoTarefa(): void {
    this.situacaoTarefaService.update(this.situacaoTarefa).subscribe(() => {
      this.situacaoTarefaService.showMessage('Situação da tarefa atualizada com sucesso');
      this.dialogRef.close();
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
    window.location.reload();
  }

}
