import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MotivoBloqueioCreateDialogComponent } from '../motivo-bloqueio-create-dialog/motivo-bloqueio-create-dialog.component';
import { MotivoBloqueioUpdateDialogComponent } from '../motivo-bloqueio-update-dialog/motivo-bloqueio-update-dialog.component';
import { MotivoBloqueio } from './../../motivo-bloqueio.module';
import { MotivoBloqueioService } from './../../motivo-bloqueio.service';

@Component({
  selector: 'app-motivo-bloqueio',
  templateUrl: './motivo-bloqueio.component.html',
  styleUrls: ['./motivo-bloqueio.component.css']
})
export class MotivoBloqueioComponent implements OnInit {

  titlePage = 'Motivo bloqueio';
  displayedColumns = ['tx_motivo_bloqueio', 'dt_inicio', 'dt_fim', 'status', 'actions'];
  motivoBloqueio: MotivoBloqueio[] = [];
  checkedInactive = false;

  constructor(private motivoBloqueioService: MotivoBloqueioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.motivoBloqueioService.read().subscribe(motivoBloqueio => {
      this.motivoBloqueio = motivoBloqueio;
      this.motivoBloqueio.forEach((motivoBloqueio) => {
        motivoBloqueio.status = motivoBloqueio.dt_fim == undefined ? true : false;
        if (motivoBloqueio.dt_fim != null) motivoBloqueio.dt_fim = this.motivoBloqueioService.formatDateToISODate(motivoBloqueio.dt_fim);
        motivoBloqueio.dt_inicio = this.motivoBloqueioService.formatDateToISODate(motivoBloqueio.dt_inicio);
      });

      this.motivoBloqueio = this.motivoBloqueio.filter((motivoBloqueio) => motivoBloqueio.status == true);
      this.motivoBloqueio.sort((a, b) => (a.id_motivo_bloqueio > b.id_motivo_bloqueio) ? -1 : 1);
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(MotivoBloqueioUpdateDialogComponent, {
      height: '260px',
      width: '500px',
    });
    dialogRef.componentInstance.id_motivo_bloqueio = String(id);
  }

  openDialogCreate(): void {
    this.dialog.open(MotivoBloqueioCreateDialogComponent, {
      height: '260px',
      width: '500px',
    });
  }

  toggleStatus = (motivoBloqueio: MotivoBloqueio) => this.updateMotivoBloqueio(motivoBloqueio);

  toggleShowInactive() { 
    if(this.checkedInactive) {
      this.motivoBloqueioService.read().subscribe(motivoBloqueio => this.motivoBloqueio = motivoBloqueio);
      this.motivoBloqueioService.read().subscribe((motivoBloqueio) => {
        this.motivoBloqueio = motivoBloqueio;
        this.motivoBloqueio.forEach((motivoBloqueio) => {
          motivoBloqueio.status = motivoBloqueio.dt_fim == undefined ? true : false;
          if (motivoBloqueio.dt_fim != null) motivoBloqueio.dt_fim = this.motivoBloqueioService.formatDateToISODate(motivoBloqueio.dt_fim);
          motivoBloqueio.dt_inicio = this.motivoBloqueioService.formatDateToISODate(motivoBloqueio.dt_inicio);
        });
      });
    }else{
      this.motivoBloqueioService.read().subscribe((motivoBloqueio) => {
        this.motivoBloqueio = motivoBloqueio;
        this.motivoBloqueio.forEach((motivoBloqueio) => {
          motivoBloqueio.status = motivoBloqueio.dt_fim == undefined ? true : false;
          if (motivoBloqueio.dt_fim != null) motivoBloqueio.dt_fim = this.motivoBloqueioService.formatDateToISODate(motivoBloqueio.dt_fim);
          motivoBloqueio.dt_inicio = this.motivoBloqueioService.formatDateToISODate(motivoBloqueio.dt_inicio);
        });
        this.motivoBloqueio = this.motivoBloqueio.filter((motivoBloqueio) => motivoBloqueio.status == true);
      });
    }
   }

  private updateMotivoBloqueio = (motivoBloqueio: MotivoBloqueio): void => {
    const dt_fim = new Date;
    
    if(motivoBloqueio.dt_fim) {
      motivoBloqueio.dt_fim = null;
    }else{
      motivoBloqueio.dt_fim = dt_fim.toISOString();
    }
    motivoBloqueio.dt_inicio = this.motivoBloqueioService.formatDateToISODate(motivoBloqueio.dt_inicio);
    this.motivoBloqueioService.update(motivoBloqueio).subscribe(() => {
      this.motivoBloqueioService.showMessage('Motivo do bloqueio atualizado com sucesso');
    });
  }
  
}
