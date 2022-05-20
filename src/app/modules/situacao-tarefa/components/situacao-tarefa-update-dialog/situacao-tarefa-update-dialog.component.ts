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
      this.situacaoTarefa.dt_inicio = this._formatDateToBr(this.situacaoTarefa.dt_inicio);
      if(this.situacaoTarefa.dt_fim != null) {
        this.situacaoTarefa.dt_fim = this._formatDateToBr(this.situacaoTarefa.dt_fim);
      } 
    });
  }

  updatesituacaoTarefa(): void {
    
    if(this.situacaoTarefa.dt_inicio.length == 8) {
      this.situacaoTarefa.dt_inicio = this._formatDate(this.situacaoTarefa.dt_inicio);
    }

    if(this.situacaoTarefa.dt_fim?.length == 8) {
      this.situacaoTarefa.dt_fim = this._formatDate(this.situacaoTarefa.dt_fim);
    }

    this.situacaoTarefa.dt_inicio = this._formatDateToEn(this.situacaoTarefa.dt_inicio);

    if(this.situacaoTarefa.dt_fim == '') {
      this.situacaoTarefa.dt_fim = null;
    }
    
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
