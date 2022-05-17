import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MotivoBloqueio } from '../../motivo-bloqueio.module';
import { MotivoBloqueioService } from '../../motivo-bloqueio.service';

@Component({
  selector: 'app-motivo-bloqueio-delete-dialog',
  templateUrl: './motivo-bloqueio-delete-dialog.component.html',
  styleUrls: ['./motivo-bloqueio-delete-dialog.component.css']
})
export class MotivoBloqueioDeleteDialogComponent implements OnInit {

  @Input() id_motivo_bloqueio: string = '';

  motivoBloqueio: MotivoBloqueio = {
    id_motivo_bloqueio: 0,
    tx_motivo_bloqueio: '',
    dt_inicio: '',
    dt_fim: ''
  }
  
  constructor(private motivoBloqueioService: MotivoBloqueioService, public dialogRef: MatDialogRef<MotivoBloqueioDeleteDialogComponent>) { }

  ngOnInit(): void {
    this.motivoBloqueioService.readById(this.id_motivo_bloqueio).subscribe((motivoBloqueio) => {
      this.motivoBloqueio = motivoBloqueio;
      this.motivoBloqueio.dt_inicio = this._formatDateToEn(this.motivoBloqueio.dt_inicio);
      if(this.motivoBloqueio.dt_fim != null) {
        this.motivoBloqueio.dt_fim = this._formatDateToEn(this.motivoBloqueio.dt_fim);
      } 
    });
  }

  deleteMotivoBloqueio = (): void => {
    const dt_fim = new Date;

    this.motivoBloqueio.dt_fim = this._formatDateToEn(dt_fim.toISOString());

    this.motivoBloqueioService.update(this.motivoBloqueio).subscribe(() => {
      this.motivoBloqueioService.showMessage('Motivo bloqueio excluido com sucesso');
      this.dialogRef.close();
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
    window.location.reload();
  }

  _formatDateToEn(date: string): string {
    const date_format = new Date(Date.parse(date));

    var dd = String(date_format.getDate()).padStart(2, '0');
    var mm = String(date_format.getMonth() + 1).padStart(2, '0');
    var yyyy = date_format.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

}
