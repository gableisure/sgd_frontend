import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EtapaEap } from '../../etapa-eap.module';
import { EtapaEapService } from './../../etapa-eap.service';

@Component({
  selector: 'app-etapa-eap-delete-dialog',
  templateUrl: './etapa-eap-delete-dialog.component.html',
  styleUrls: ['./etapa-eap-delete-dialog.component.css']
})
export class EtapaEapDeleteDialogComponent implements OnInit {

  @Input() id_etapa: string = '';

  etapaEap: EtapaEap = {
    id_etapa: 0,
    ds_etapa: '',
    dt_inicio_vigencia: '',
    dt_fim_vigencia: ''
  }
  
  constructor(private etapaEapService: EtapaEapService, public dialogRef: MatDialogRef<EtapaEapDeleteDialogComponent>) { }

  ngOnInit(): void {
    this.etapaEapService.readById(this.id_etapa).subscribe((etapaEap) => {
      this.etapaEap = etapaEap;
      console.log(this.etapaEap)
      
      if(this.etapaEap.dt_inicio_vigencia != null) {
        this.etapaEap.dt_inicio_vigencia = this._formatDateToEn(this.etapaEap.dt_inicio_vigencia);
      } 
      if(this.etapaEap.dt_fim_vigencia != null) {
        this.etapaEap.dt_fim_vigencia = this._formatDateToEn(this.etapaEap.dt_fim_vigencia);
      } 
    });
  }

  deleteMotivoBloqueio = (): void => {
    const dt_fim_vigencia = new Date;
    
    this.etapaEap.dt_fim_vigencia = this._formatDateToEn(dt_fim_vigencia.toISOString());
    console.log(this.etapaEap)
    this.etapaEapService.update(this.etapaEap).subscribe(() => {
      this.etapaEapService.showMessage('Etapa eap excluida com sucesso');
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
