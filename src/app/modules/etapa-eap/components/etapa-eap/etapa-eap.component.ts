import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EtapaEap } from '../../etapa-eap.module';
import { EtapaEapService } from '../../etapa-eap.service';
import { EtapaEapCreateDialogComponent } from '../etapa-eap-create-dialog/etapa-eap-create-dialog.component';
import { EtapaEapUpdateDialogComponent } from '../etapa-eap-update-dialog/etapa-eap-update-dialog.component';

@Component({
  selector: 'app-etapa-eap',
  templateUrl: './etapa-eap.component.html',
  styleUrls: ['./etapa-eap.component.css']
})
export class EtapaEapComponent implements OnInit {

  titlePage = 'Etapa EAP';
  displayedColumns = ['ds_etapa', 'dt_inicio_vigencia', 'dt_fim_vigencia', 'status', 'actions'];
  etapaEap: EtapaEap[] = [];
  checkedInactive = false;

  constructor(private etapaEapService: EtapaEapService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.etapaEapService.read().subscribe(etapaEap => {
      this.etapaEap = etapaEap;
      this.etapaEap.forEach((etapaEap) => {
        etapaEap.status = etapaEap.dt_fim_vigencia == undefined ? true : false;
        if (etapaEap.dt_fim_vigencia != null) etapaEap.dt_fim_vigencia = this.etapaEapService.formatDateToISODate(etapaEap.dt_fim_vigencia);
        etapaEap.dt_inicio_vigencia = this.etapaEapService.formatDateToISODate(etapaEap.dt_inicio_vigencia);
      });
      this.etapaEap = this.etapaEap.filter((etapaEap) => etapaEap.status == true);
      this.etapaEap.sort((a, b) => (a.id_etapa > b.id_etapa) ? -1 : 1);
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(EtapaEapUpdateDialogComponent, {
      height: '260px',
      width: '820px',
    });
    dialogRef.componentInstance.id_etapa = String(id);
  }

  openDialogCreate(): void {
    this.dialog.open(EtapaEapCreateDialogComponent, {
      height: '260px',
      width: '820px',
    });
  }

  toggleStatus = (etapaEap: EtapaEap) => this.updateEtapaEap(etapaEap);

  toggleShowInactive() { 
    if(this.checkedInactive) {
      this.etapaEapService.read().subscribe(etapaEap => this.etapaEap = etapaEap);
      this.etapaEapService.read().subscribe((etapaEap) => {
        this.etapaEap = etapaEap;
        this.etapaEap.forEach((etapaEap) => {
          etapaEap.status = etapaEap.dt_fim_vigencia == undefined ? true : false;
          if (etapaEap.dt_fim_vigencia != null) etapaEap.dt_fim_vigencia = this.etapaEapService.formatDateToISODate(etapaEap.dt_fim_vigencia);
          etapaEap.dt_inicio_vigencia = this.etapaEapService.formatDateToISODate(etapaEap.dt_inicio_vigencia);
        });
      });
    }else{
      this.etapaEapService.read().subscribe((etapaEap) => {
        this.etapaEap = etapaEap;
        this.etapaEap.forEach((etapaEap) => {
          etapaEap.status = etapaEap.dt_fim_vigencia == undefined ? true : false;
          if (etapaEap.dt_fim_vigencia != null) etapaEap.dt_fim_vigencia = this.etapaEapService.formatDateToISODate(etapaEap.dt_fim_vigencia);
          etapaEap.dt_inicio_vigencia = this.etapaEapService.formatDateToISODate(etapaEap.dt_inicio_vigencia);
        });
        this.etapaEap = this.etapaEap.filter((etapaEap) => etapaEap.status == true);
      });
    }
   }

  private updateEtapaEap = (etapaEap: EtapaEap): void => {
    const dt_fim_vigencia = new Date;

    if(etapaEap.dt_fim_vigencia) {
      etapaEap.dt_fim_vigencia = null;
    }else{
      etapaEap.dt_fim_vigencia = dt_fim_vigencia.toISOString();
    }
    etapaEap.dt_inicio_vigencia = this.etapaEapService.formatDateToISODate(etapaEap.dt_inicio_vigencia);

    this.etapaEapService.update(etapaEap).subscribe(() => {
      this.etapaEapService.showMessage('Etapa EAP atualizada com sucesso');
    });
  }



}
