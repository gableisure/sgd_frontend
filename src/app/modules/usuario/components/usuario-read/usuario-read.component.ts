import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../usuario.module';
import { UsuarioService } from '../../usuario.service';
import { UsuarioCreateDialogComponent } from '../usuario-create-dialog/usuario-create-dialog.component';

@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})
export class UsuarioReadComponent implements OnInit {

  @Input() id_usuario: string = ''
  
  usuarios: Usuario[] = [];
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

  constructor(private usuarioService: UsuarioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.usuarioService.read().subscribe(usuarios => {
      this.usuarios = usuarios
      this.usuarios.sort((a, b) => (a.nm_usuario.toUpperCase() < b.nm_usuario.toUpperCase()) ? -1 : 1)
    });

    /* this.usuarioService.readById(this.id).subscribe((usuario) => {
      this.usuario = usuario;
    }); */
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(UsuarioCreateDialogComponent, {
      height: '400px',
      width: '500px',
    });

  }

  /* 
  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      height: '400px',
      width: '500px',
    });

    dialogRef.componentInstance.id = String(id);
    
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      height: '160px',
      width: '500px',
    });

    dialogRef.componentInstance.id = String(id);
    
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  } */

}
