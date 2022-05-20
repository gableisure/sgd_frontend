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
      this.situacaoAtividade.dt_inicio = this._formatDateToBr(this.situacaoAtividade.dt_inicio);
      if(this.situacaoAtividade.dt_fim != null) {
        this.situacaoAtividade.dt_fim = this._formatDateToBr(this.situacaoAtividade.dt_fim);
      } 
    });
  }

  updateSituacaoAtividade(): void {
    
    if(this.situacaoAtividade.dt_inicio.length == 8) {
      this.situacaoAtividade.dt_inicio = this._formatDate(this.situacaoAtividade.dt_inicio);
    }

    if(this.situacaoAtividade.dt_fim?.length == 8) {
      this.situacaoAtividade.dt_fim = this._formatDate(this.situacaoAtividade.dt_fim);
    }

    this.situacaoAtividade.dt_inicio = this._formatDateToEn(this.situacaoAtividade.dt_inicio);

    if(this.situacaoAtividade.dt_fim == '') {
      this.situacaoAtividade.dt_fim = null;
      
    }
    
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

  _formatDateToBr(date: string): string {
    const date_format = new Date(Date.parse(date));

    var dd = String(date_format.getDate()).padStart(2, '0');
    var mm = String(date_format.getMonth() + 1).padStart(2, '0');
    var yyyy = date_format.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  _formatDateToEn(date: string): string {
    
    const [day, month, year] = date.split('/');

    const dateFormat = new Date(Number(year), Number(month), Number(day));
    var dd = String(dateFormat.getDate()).padStart(2, '0');
    var mm = String(dateFormat.getMonth()).padStart(2, '0');
    var yyyy = dateFormat.getFullYear();
    
    return yyyy + '-' + mm + '-' + dd;
  }

  _formatDate(date: string) {
    var dd = date.slice(0, 2);
    var mm = date.slice(2, 4);
    var yyyy = date.slice(4, 8);
    
    return dd + '/' + mm + '/' + yyyy;
  }
}
