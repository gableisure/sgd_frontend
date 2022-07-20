import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PrioridadeAtividadeService } from '../../prioridade-atividade.service';
import { PrioridadeAtividade } from './../../prioridade-atividade.module';

@Component({
  selector: 'app-prioridade-atividade-update-dialog',
  templateUrl: './prioridade-atividade-update-dialog.component.html',
  styleUrls: ['./prioridade-atividade-update-dialog.component.css']
})
export class PrioridadeAtividadeUpdateDialogComponent implements OnInit {

  @Input() id_prioridade_atividade: string = '';

  titleDialog: string = 'Editar prioridade da atividade';

  prioridadeAtividade: PrioridadeAtividade = {
    id_prioridade_atividade: 0,
    ds_prioridade_atividade: '',
    dt_inicio_vigencia: '',
    dt_fim_vigencia: '',
    status: true,
    classe: "",
    nome_icone: "",
  }
 
  constructor(private prioridadeAtividadeService: PrioridadeAtividadeService, public dialogRef: MatDialogRef<PrioridadeAtividadeUpdateDialogComponent>) { }

  ngOnInit(): void {
    this.prioridadeAtividadeService.readById(this.id_prioridade_atividade).subscribe((prioridadeAtividade) => {
      this.prioridadeAtividade = prioridadeAtividade;
    });
  }

  updatePrioridadeAtividade(): void {
    this.prioridadeAtividadeService.update(this.prioridadeAtividade).subscribe(() => {
      this.prioridadeAtividadeService.showMessage('Prioridade da atividade atualizada com sucesso');
      this.dialogRef.close();
      window.location.reload();
    });

  }

  cancel(): void {
    this.dialogRef.close();
    window.location.reload();
  }

}
