import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../usuario.module';
import { UsuarioService } from '../../usuario.service';

interface PerfilUsuario {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-usuario-create-dialog',
  templateUrl: './usuario-create-dialog.component.html',
  styleUrls: ['./usuario-create-dialog.component.css']
})

export class UsuarioCreateDialogComponent implements OnInit {
  titleDialog: string = 'Novo usuário';

  usuario: Usuario = {
    id_usuario: 0,
    nm_usuario: "",
    nr_cpf: "",
    id_perfil_usuario: 0,
    ds_perfil_usuario: "",
    id_ted: 0,
    dt_inicio_cadastro: "",
    dt_fim_cadastro: "",
    id_motivo_bloqueio: 0
  }

  perfisUsuario: PerfilUsuario[] = [
    {value: 1, viewValue: 'Administrador'},
    {value: 2, viewValue: 'Pesquisador'},
    {value: 3, viewValue: 'Cliente'},
    {value: 4, viewValue: 'Gestor TED'},
  ];

  constructor(private usuarioService: UsuarioService, public dialogRef: MatDialogRef<UsuarioCreateDialogComponent>) { }

  ngOnInit(): void {
  }

  /* createUsuario(): void {
    this.usuarioService.create(this.usuario).subscribe(() => {
      this.usuarioService.showMessage('Usuário criado com sucesso!')
      this.dialogRef.close();
      window.location.reload();
    });
  } */

  cancel(): void {
    this.dialogRef.close();
    window.location.reload();
  }


  changeSelectTypeUser({ value }: MatButtonToggleChange): void {
    this.usuario['id_perfil_usuario'] = value
  }
  
}
