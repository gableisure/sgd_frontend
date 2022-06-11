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
    dt_inicio_vigencia: '',
    dt_fim_vigencia: '',
    status: true
  }
  
  constructor(private motivoBloqueioService: MotivoBloqueioService, public dialogRef: MatDialogRef<MotivoBloqueioUpdateDialogComponent>) { }

  ngOnInit(): void {
    this.motivoBloqueioService.readById(this.id_motivo_bloqueio).subscribe((motivoBloqueio) => {
      this.motivoBloqueio = motivoBloqueio;
    });
  }

  updateMotivoBloqueio(): void {
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

}
