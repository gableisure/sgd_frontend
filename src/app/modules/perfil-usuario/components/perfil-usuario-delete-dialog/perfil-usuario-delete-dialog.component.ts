import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PerfilUsuario } from '../../perfil-usuario.module';
import { PerfilUsuarioService } from '../../perfil-usuario.service';

@Component({
  selector: 'app-perfil-usuario-delete-dialog',
  templateUrl: './perfil-usuario-delete-dialog.component.html',
  styleUrls: ['./perfil-usuario-delete-dialog.component.css']
})
export class PerfilUsuarioDeleteDialogComponent implements OnInit {

  @Input() id_perfil_usuario: string = '';

  titleDialog: string = 'Editar perfil do usuário';

  perfilUsuario: PerfilUsuario = {
    id_perfil_usuario: 0,
    ds_perfil_usuario: '',
    dt_inicio_vigencia: '',
    dt_fim_vigencia: ''
  }
  
  constructor(private perfilUsuarioService: PerfilUsuarioService, public dialogRef: MatDialogRef<PerfilUsuarioDeleteDialogComponent>) { }

  ngOnInit(): void {
    this.perfilUsuarioService.readById(this.id_perfil_usuario).subscribe((perfilUsuario) => {
      this.perfilUsuario = perfilUsuario;
      this.perfilUsuario.dt_inicio_vigencia = this._formatDateToEn(this.perfilUsuario.dt_inicio_vigencia);
      if(this.perfilUsuario.dt_fim_vigencia != null) {
        this.perfilUsuario.dt_fim_vigencia = this._formatDateToEn(this.perfilUsuario.dt_fim_vigencia);
      } 
    });
  }

  deleteTed = (): void => {
    const dt_fim_vigencia = new Date;

    this.perfilUsuario.dt_fim_vigencia = this._formatDateToEn(dt_fim_vigencia.toISOString());

    this.perfilUsuarioService.update(this.perfilUsuario).subscribe(() => {
      this.perfilUsuarioService.showMessage('Perfil do usuário excluido com sucesso');
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
