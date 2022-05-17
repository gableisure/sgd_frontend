import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoBloqueioCreateDialogComponent } from '../motivo-bloqueio-create-dialog/motivo-bloqueio-create-dialog.component';
import { MotivoBloqueioDeleteDialogComponent } from '../motivo-bloqueio-delete-dialog/motivo-bloqueio-delete-dialog.component';
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
  displayedColumns = ['id_motivo_bloqueio', 'tx_motivo_bloqueio', 'dt_inicio', 'dt_fim', 'actions'];
  motivoBloqueio: MotivoBloqueio[] = [];

  constructor(private motivoBloqueioService: MotivoBloqueioService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.motivoBloqueioService.read().subscribe(motivoBloqueio => {
      this.motivoBloqueio = motivoBloqueio;
    });
    
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(MotivoBloqueioUpdateDialogComponent, {
      height: '450px',
      width: '500px',
    });
    dialogRef.componentInstance.id_motivo_bloqueio = String(id);
  }
  
  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(MotivoBloqueioDeleteDialogComponent, {
      height: '160px',
      width: '400px',
    });
    dialogRef.componentInstance.id_motivo_bloqueio = String(id);
  }

  openDialogCreate(): void {
    this.dialog.open(MotivoBloqueioCreateDialogComponent, {
      height: '260px',
      width: '500px',
    });
  }

}
