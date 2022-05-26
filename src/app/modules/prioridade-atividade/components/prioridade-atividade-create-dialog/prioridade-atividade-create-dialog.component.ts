import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PrioridadeAtividade } from '../../prioridade-atividade.module';
import { PrioridadeAtividadeService } from '../../prioridade-atividade.service';

@Component({
  selector: 'app-prioridade-atividade-create-dialog',
  templateUrl: './prioridade-atividade-create-dialog.component.html',
  styleUrls: ['./prioridade-atividade-create-dialog.component.css']
})
export class PrioridadeAtividadeCreateDialogComponent implements OnInit {

  titleDialog: string = 'Criar prioridade da atividade';

  prioridadeAtividade: PrioridadeAtividade = {
    id_prioridade_atividade: 0,
    ds_prioridade_atividade: '',
    dt_inicio: '',
    dt_fim: '',
    status: true
    /* TODO: Testar a ideia da linha debaixo na linha de cima */
    /* labelPosition: 'before' | 'after' = 'after'; */
  }
  
  constructor(private prioridadeAtividadeService: PrioridadeAtividadeService, public dialogRef: MatDialogRef<PrioridadeAtividadeCreateDialogComponent>) { }

  ngOnInit(): void {
  }

  createPrioridadeAtividade(): void {
    this.prioridadeAtividadeService.create(this.prioridadeAtividade).subscribe(() => {
      this.dialogRef.close();
      this.prioridadeAtividadeService.showMessage('Prioridade da atividade criada com sucesso!');
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
