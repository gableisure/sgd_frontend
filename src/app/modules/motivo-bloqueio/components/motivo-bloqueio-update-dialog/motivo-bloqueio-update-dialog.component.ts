import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MotivoBloqueio } from '../../motivo-bloqueio.module';
import { MotivoBloqueioService } from '../../motivo-bloqueio.service';

@Component({
  selector: 'app-motivo-bloqueio-update-dialog',
  templateUrl: './motivo-bloqueio-update-dialog.component.html',
  styleUrls: ['./motivo-bloqueio-update-dialog.component.css']
})
export class MotivoBloqueioUpdateDialogComponent implements OnInit {

  @Input() id_motivo_bloqueio: string = '';
  
  titleDialog: string = 'Editar motivo bloqueio';

  motivoBloqueio: MotivoBloqueio = {
    id_motivo_bloqueio: 0,
    tx_motivo_bloqueio: '',
    dt_inicio: '',
    dt_fim: '',
    status: true
  }
  
  constructor(private motivoBloqueioService: MotivoBloqueioService, public dialogRef: MatDialogRef<MotivoBloqueioUpdateDialogComponent>) { }

  ngOnInit(): void {
    this.motivoBloqueioService.readById(this.id_motivo_bloqueio).subscribe((motivoBloqueio) => {
      this.motivoBloqueio = motivoBloqueio;
      this.motivoBloqueio.dt_inicio = this._formatDateToBr(this.motivoBloqueio.dt_inicio);
      if(this.motivoBloqueio.dt_fim != null) {
        this.motivoBloqueio.dt_fim = this._formatDateToBr(this.motivoBloqueio.dt_fim);
      } 
    });
  }

  updateMotivoBloqueio(): void {
    
    if(this.motivoBloqueio.dt_inicio.length == 8) {
      this.motivoBloqueio.dt_inicio = this._formatDate(this.motivoBloqueio.dt_inicio);
    }

    if(this.motivoBloqueio.dt_fim?.length == 8) {
      this.motivoBloqueio.dt_fim = this._formatDate(this.motivoBloqueio.dt_fim);
    }

    this.motivoBloqueio.dt_inicio = this._formatDateToEn(this.motivoBloqueio.dt_inicio);

    if(this.motivoBloqueio.dt_fim == '') {
      this.motivoBloqueio.dt_fim = null;
      
    }
    
    this.motivoBloqueioService.update(this.motivoBloqueio).subscribe(() => {
      this.motivoBloqueioService.showMessage('Motivo bloqueio atualizado com sucesso');
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
