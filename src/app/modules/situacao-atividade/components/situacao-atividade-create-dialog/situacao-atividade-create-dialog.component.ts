import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SituacaoAtividadeService } from '../../situacao-atividade.service';
import { SituacaoAtividade } from '../../situacao-atividade.module';

@Component({
  selector: 'app-situacao-atividade-create-dialog',
  templateUrl: './situacao-atividade-create-dialog.component.html',
  styleUrls: ['./situacao-atividade-create-dialog.component.css']
})
export class SituacaoAtividadeCreateDialogComponent implements OnInit {

  titleDialog: string = 'Criar situação da atividade';

  situacaoAtividade: SituacaoAtividade = {
    id_situacao_atividade: 0,
    ds_situacao_atividade: '',
    dt_inicio_vigencia: '',
    dt_fim_vigencia: '',
    status: true,
    icone: ''
  }

  constructor(private situacaoAtividadeService: SituacaoAtividadeService, public dialogRef: MatDialogRef<SituacaoAtividadeCreateDialogComponent>) { }

  ngOnInit(): void {
  }

  createSituacaoAtividade(): void {
    this.situacaoAtividadeService.create(this.situacaoAtividade).subscribe(() => {
      this.dialogRef.close();
      this.situacaoAtividadeService.showMessage('Situação da atividade criada com sucesso!');
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
