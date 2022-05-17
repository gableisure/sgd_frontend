import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EtapaEap } from '../../etapa-eap.module';
import { EtapaEapService } from '../../etapa-eap.service';
import { EtapaEapCreateDialogComponent } from '../etapa-eap-create-dialog/etapa-eap-create-dialog.component';
import { EtapaEapDeleteDialogComponent } from '../etapa-eap-delete-dialog/etapa-eap-delete-dialog.component';
import { EtapaEapUpdateDialogComponent } from '../etapa-eap-update-dialog/etapa-eap-update-dialog.component';

@Component({
  selector: 'app-etapa-eap',
  templateUrl: './etapa-eap.component.html',
  styleUrls: ['./etapa-eap.component.css']
})
export class EtapaEapComponent implements OnInit {

  titlePage = 'Etapa eap';
  displayedColumns = ['id_etapa', 'ds_etapa', 'dt_inicio_vigencia', 'dt_fim_vigencia', 'actions'];
  etapaEap: EtapaEap[] = []

  constructor(private etapaEapService: EtapaEapService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.etapaEapService.read().subscribe(etapaEap => {
      this.etapaEap = etapaEap;
      this.etapaEap.sort((a, b) => (a.id_etapa < b.id_etapa) ? -1 : 1)
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(EtapaEapUpdateDialogComponent, {
      height: '450px',
      width: '820px',
    });
    dialogRef.componentInstance.id_etapa = String(id);
  }

  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(EtapaEapDeleteDialogComponent, {
      height: '160px',
      width: '400px',
    });
    dialogRef.componentInstance.id_etapa = String(id);
  }

  openDialogCreate(): void {
    this.dialog.open(EtapaEapCreateDialogComponent, {
      height: '260px',
      width: '500px',
    });
  }

}
