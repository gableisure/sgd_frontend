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
  
  titleDialog: string = 'Editar etapa eap';

  etapaEap: EtapaEap = {
    id_etapa: 0,
    ds_etapa: '',
    dt_inicio_vigencia: '',
    dt_fim_vigencia: ''
  }
  
  constructor(private etapaEapService: EtapaEapService, public dialogRef: MatDialogRef<EtapaEapUpdateDialogComponent>) { }

  ngOnInit(): void {
    this.etapaEapService.readById(this.id_etapa).subscribe((etapaEap) => {
      this.etapaEap = etapaEap;
      if(this.etapaEap.dt_inicio_vigencia != null) {
        this.etapaEap.dt_inicio_vigencia = this._formatDateToBr(this.etapaEap.dt_inicio_vigencia);
      } 
      if(this.etapaEap.dt_fim_vigencia != null) {
        this.etapaEap.dt_fim_vigencia = this._formatDateToBr(this.etapaEap.dt_fim_vigencia);
      } 
    });
  }

  updateEtapaEap(): void {

    if(this.etapaEap.dt_inicio_vigencia?.length == 8) {
      this.etapaEap.dt_inicio_vigencia = this._formatDate(this.etapaEap.dt_inicio_vigencia);
    }

    if(this.etapaEap.dt_fim_vigencia?.length == 8) {
      this.etapaEap.dt_fim_vigencia = this._formatDate(this.etapaEap.dt_fim_vigencia);
    }

    if(this.etapaEap.dt_inicio_vigencia == '') this.etapaEap.dt_inicio_vigencia = null;
    if(this.etapaEap.dt_fim_vigencia == '') this.etapaEap.dt_fim_vigencia = null;

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

  _formatDateToBr(date: string): string {
    const date_format = new Date(Date.parse(date));

    var dd = String(date_format.getDate()).padStart(2, '0');
    var mm = String(date_format.getMonth() + 1).padStart(2, '0');
    var yyyy = date_format.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  _formatDateToEn(date: string): string {
    if(date != null) {
      const [day, month, year] = date.split('/');

      const dateFormat = new Date(Number(year), Number(month), Number(day));
      var dd = String(dateFormat.getDate()).padStart(2, '0');
      var mm = String(dateFormat.getMonth()).padStart(2, '0');
      var yyyy = dateFormat.getFullYear();
      
      return yyyy + '-' + mm + '-' + dd;
    }else{
      return '';
    }

  }

  _formatDate(date: string) {
    if(date != null) {
      var dd = date.slice(0, 2);
      var mm = date.slice(2, 4);
      var yyyy = date.slice(4, 8);
      
      return dd + '/' + mm + '/' + yyyy;
    }else{
      return '';
    }
    
  }

}
