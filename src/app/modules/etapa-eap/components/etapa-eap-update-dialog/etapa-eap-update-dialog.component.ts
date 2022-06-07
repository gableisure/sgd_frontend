import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EtapaEap } from '../../etapa-eap.module';
import { EtapaEapService } from '../../etapa-eap.service';

@Component({
  selector: 'app-etapa-eap-update-dialog',
  templateUrl: './etapa-eap-update-dialog.component.html',
  styleUrls: ['./etapa-eap-update-dialog.component.css']
})
export class EtapaEapUpdateDialogComponent implements OnInit {

  @Input() id_etapa: string = '';
  
  titleDialog: string = 'Editar etapa EAP';

  etapaEap: EtapaEap = {
    id_etapa: 0,
    ds_etapa: '',
    dt_inicio_vigencia: '',
    dt_fim_vigencia: '',
    status: true
  }
  
  constructor(private etapaEapService: EtapaEapService, public dialogRef: MatDialogRef<EtapaEapUpdateDialogComponent>) { }

  ngOnInit(): void {
    this.etapaEapService.readById(this.id_etapa).subscribe((etapaEap) => {
      this.etapaEap = etapaEap;
    });
  }

  updateEtapaEap(): void {
    this.etapaEapService.update(this.etapaEap).subscribe(() => {
      this.etapaEapService.showMessage('Etapa eap atualizada com sucesso');
      this.dialogRef.close();
      window.location.reload();
    });

  }

  cancel(): void {
    this.dialogRef.close();
    window.location.reload();
  }

}
