import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PerfilUsuario } from '../../perfil-usuario.module';
import { PerfilUsuarioService } from '../../perfil-usuario.service';

@Component({
  selector: 'app-perfil-usuario-create-dialog',
  templateUrl: './perfil-usuario-create-dialog.component.html',
  styleUrls: ['./perfil-usuario-create-dialog.component.css']
})
export class PerfilUsuarioCreateDialogComponent implements OnInit {

  titleDialog: string = 'Criar perfil do usuário';

  perfilUsuario: PerfilUsuario = {
    id_perfil_usuario: 0,
    ds_perfil_usuario: '',
    dt_inicio_vigencia: '',
    dt_fim_vigencia: '',
    status: true
  }
  
  constructor(private perfilUsuarioService: PerfilUsuarioService, public dialogRef: MatDialogRef<PerfilUsuarioCreateDialogComponent>) { }

  ngOnInit(): void {
  }

  createPerfilUsuario(): void {
    const dt_inicio_vigencia = new Date;

    this.perfilUsuario.dt_inicio_vigencia = this._formatDateToEn(dt_inicio_vigencia.toISOString());
    this.perfilUsuarioService.create(this.perfilUsuario).subscribe(() => {
      this.dialogRef.close();
      this.perfilUsuarioService.showMessage('Perfil do usuário criado com sucesso!');
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


