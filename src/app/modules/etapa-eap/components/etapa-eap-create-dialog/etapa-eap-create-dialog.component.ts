import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EtapaEap } from '../../etapa-eap.module';
import { EtapaEapService } from '../../etapa-eap.service';

@Component({
  selector: 'app-etapa-eap-create-dialog',
  templateUrl: './etapa-eap-create-dialog.component.html',
  styleUrls: ['./etapa-eap-create-dialog.component.css']
})
export class EtapaEapCreateDialogComponent implements OnInit {

  titleDialog: string = 'Editar etapa eap';

  etapaEap: EtapaEap = {
    id_etapa: 0,
    ds_etapa: '',
    dt_inicio_vigencia: '',
    dt_fim_vigencia: ''
  }
  
  constructor(private etapaEapService: EtapaEapService, public dialogRef: MatDialogRef<EtapaEapCreateDialogComponent>) { }

  ngOnInit(): void {
  }

  createEtapaEap(): void {
    const dt_inicio_vigencia = new Date;

    this.etapaEap.dt_inicio_vigencia = this._formatDateToEn(dt_inicio_vigencia.toISOString());
    this.etapaEapService.create(this.etapaEap).subscribe(() => {
      this.dialogRef.close();
      this.etapaEapService.showMessage('Perfil do usuário criado com sucesso!');
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
