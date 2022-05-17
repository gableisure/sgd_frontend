import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MotivoBloqueio } from '../../motivo-bloqueio.module';
import { MotivoBloqueioService } from '../../motivo-bloqueio.service';

@Component({
  selector: 'app-motivo-bloqueio-create-dialog',
  templateUrl: './motivo-bloqueio-create-dialog.component.html',
  styleUrls: ['./motivo-bloqueio-create-dialog.component.css']
})
export class MotivoBloqueioCreateDialogComponent implements OnInit {

  titleDialog: string = 'Criar motivo bloqueio';

  motivoBloqueio: MotivoBloqueio = {
    id_motivo_bloqueio: 0,
    tx_motivo_bloqueio: '',
    dt_inicio: '',
    dt_fim: ''
  }

  constructor(private motivoBloqueioService: MotivoBloqueioService, public dialogRef: MatDialogRef<MotivoBloqueioCreateDialogComponent>) { }

  ngOnInit(): void {
  }

  createMotivoBloqueio(): void {
    const dt_inicio = new Date;

    this.motivoBloqueio.dt_inicio = this._formatDateToEn(dt_inicio.toISOString());
    this.motivoBloqueioService.create(this.motivoBloqueio).subscribe(() => {
      this.dialogRef.close();
      this.motivoBloqueioService.showMessage('Perfil do usuário criado com sucesso!');
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  _formatDateToEn(date: string): string {
    const date_format = new Date(Date.parse(date));

    var dd = String(date_format.getDate()).padStart(2, '0');
    var mm = String(date_format.getMonth() + 1).padStart(2, '0');
    var yyyy = date_format.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

}
