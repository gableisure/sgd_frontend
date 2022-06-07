import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SituacaoAtividade } from '../../situacao-atividade.module';
import { SituacaoAtividadeService } from '../../situacao-atividade.service';

@Component({
  selector: 'app-situacao-atividade-update-dialog',
  templateUrl: './situacao-atividade-update-dialog.component.html',
  styleUrls: ['./situacao-atividade-update-dialog.component.css']
})
export class SituacaoAtividadeUpdateDialogComponent implements OnInit {

  @Input() id_situacao_atividade: string = '';

  titleDialog: string = 'Editar situação da atividade';

  situacaoAtividade: SituacaoAtividade = {
    id_situacao_atividade: 0,
    ds_situacao_atividade: '',
    dt_inicio: '',
    dt_fim: '',
    status: true
  }
 
  constructor(private situacaoAtividadeService: SituacaoAtividadeService, public dialogRef: MatDialogRef<SituacaoAtividadeUpdateDialogComponent>) { }

  ngOnInit(): void {
    this.situacaoAtividadeService.readById(this.id_situacao_atividade).subscribe((situacaoAtividade) => {
      this.situacaoAtividade = situacaoAtividade;
    });
  }

  updateSituacaoAtividade(): void {
    this.situacaoAtividadeService.update(this.situacaoAtividade).subscribe(() => {
      this.situacaoAtividadeService.showMessage('Situação da atividade atualizada com sucesso');
      this.dialogRef.close();
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
    window.location.reload();
  }

}
