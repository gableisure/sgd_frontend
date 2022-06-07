import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PerfilUsuario } from '../../perfil-usuario.module';
import { PerfilUsuarioService } from '../../perfil-usuario.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
   
@Component({
  selector: 'app-perfil-usuario-update-dialog',
  templateUrl: './perfil-usuario-update-dialog.component.html',
  styleUrls: ['./perfil-usuario-update-dialog.component.css'],
  providers: [
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
    /* TODO: NÃO DEU CERTO */
    /* labelPosition: 'before' | 'after' = 'after'; */
  }
 
  constructor(private perfilUsuarioService: PerfilUsuarioService, public dialogRef: MatDialogRef<PerfilUsuarioUpdateDialogComponent>) { }

  ngOnInit(): void {
    this.perfilUsuarioService.readById(this.id_perfil_usuario).subscribe((perfilUsuario) => {
      this.perfilUsuario = perfilUsuario;
    });
  }

  updatePerfilUsuario(): void {
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

}
