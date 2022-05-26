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
    dt_inicio: '',
    dt_fim: '',
    status: true
    /* TODO: Testar a ideia da linha debaixo na linha de cima */
    /* labelPosition: 'before' | 'after' = 'after'; */
  }
 
  constructor(private prioridadeAtividadeService: PrioridadeAtividadeService, public dialogRef: MatDialogRef<PrioridadeAtividadeUpdateDialogComponent>) { }

  ngOnInit(): void {
    this.prioridadeAtividadeService.readById(this.id_prioridade_atividade).subscribe((prioridadeAtividade) => {
      this.prioridadeAtividade = prioridadeAtividade;
      this.prioridadeAtividade.dt_inicio = this._formatDateToBr(this.prioridadeAtividade.dt_inicio);
      if(this.prioridadeAtividade.dt_fim != null) {
        this.prioridadeAtividade.dt_fim = this._formatDateToBr(this.prioridadeAtividade.dt_fim);
      } 
    });
  }

  updatePrioridadeAtividade(): void {
    
    if(this.prioridadeAtividade.dt_inicio.length == 8) {
      this.prioridadeAtividade.dt_inicio = this._formatDate(this.prioridadeAtividade.dt_inicio);
    }

    if(this.prioridadeAtividade.dt_fim?.length == 8) {
      this.prioridadeAtividade.dt_fim = this._formatDate(this.prioridadeAtividade.dt_fim);
    }

    this.prioridadeAtividade.dt_inicio = this._formatDateToEn(this.prioridadeAtividade.dt_inicio);

    if(this.prioridadeAtividade.dt_fim == '') {
      this.prioridadeAtividade.dt_fim = null;
      
    }
    
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
