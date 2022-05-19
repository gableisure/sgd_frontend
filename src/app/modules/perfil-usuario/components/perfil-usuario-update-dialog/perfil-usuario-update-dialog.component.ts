import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PerfilUsuario } from '../../perfil-usuario.module';
import { PerfilUsuarioService } from '../../perfil-usuario.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
   
export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
};

@Component({
  selector: 'app-perfil-usuario-update-dialog',
  templateUrl: './perfil-usuario-update-dialog.component.html',
  styleUrls: ['./perfil-usuario-update-dialog.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class PerfilUsuarioUpdateDialogComponent implements OnInit {

  @Input() id_perfil_usuario: string = '';

  titleDialog: string = 'Editar perfil do usuário';

  perfilUsuario: PerfilUsuario = {
    id_perfil_usuario: 0,
    ds_perfil_usuario: '',
    dt_inicio_vigencia: '',
    dt_fim_vigencia: '',
    status: true
    /* TODO: Testar a ideia da linha debaixo na linha de cima */
    /* labelPosition: 'before' | 'after' = 'after'; */
  }
 
  constructor(private perfilUsuarioService: PerfilUsuarioService, public dialogRef: MatDialogRef<PerfilUsuarioUpdateDialogComponent>) { }

  ngOnInit(): void {
    this.perfilUsuarioService.readById(this.id_perfil_usuario).subscribe((perfilUsuario) => {
      this.perfilUsuario = perfilUsuario;
      this.perfilUsuario.dt_inicio_vigencia = this._formatDateToBr(this.perfilUsuario.dt_inicio_vigencia);
      if(this.perfilUsuario.dt_fim_vigencia != null) {
        this.perfilUsuario.dt_fim_vigencia = this._formatDateToBr(this.perfilUsuario.dt_fim_vigencia);
      } 
    });
  }

  updatePerfilUsuario(): void {
    
    if(this.perfilUsuario.dt_inicio_vigencia.length == 8) {
      this.perfilUsuario.dt_inicio_vigencia = this._formatDate(this.perfilUsuario.dt_inicio_vigencia);
    }

    if(this.perfilUsuario.dt_fim_vigencia?.length == 8) {
      this.perfilUsuario.dt_fim_vigencia = this._formatDate(this.perfilUsuario.dt_fim_vigencia);
    }

    this.perfilUsuario.dt_inicio_vigencia = this._formatDateToEn(this.perfilUsuario.dt_inicio_vigencia);

    if(this.perfilUsuario.dt_fim_vigencia == '') {
      this.perfilUsuario.dt_fim_vigencia = null;
      
    }
    
    this.perfilUsuarioService.update(this.perfilUsuario).subscribe(() => {
      this.perfilUsuarioService.showMessage('Perfil do usuário atualizado com sucesso');
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
    
    const [day, month, year] = date.split('/');

    const dateFormat = new Date(Number(year), Number(month), Number(day));
    var dd = String(dateFormat.getDate()).padStart(2, '0');
    var mm = String(dateFormat.getMonth()).padStart(2, '0');
    var yyyy = dateFormat.getFullYear();
    
    return yyyy + '-' + mm + '-' + dd;
  }

  _formatDate(date: string) {
    var dd = date.slice(0, 2);
    var mm = date.slice(2, 4);
    var yyyy = date.slice(4, 8);
    
    return dd + '/' + mm + '/' + yyyy;
  }

}
