import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PerfilUsuario } from '../../perfil-usuario.module';
import { PerfilUsuarioCreateDialogComponent } from '../perfil-usuario-create-dialog/perfil-usuario-create-dialog.component';
import { PerfilUsuarioDeleteDialogComponent } from '../perfil-usuario-delete-dialog/perfil-usuario-delete-dialog.component';
import { PerfilUsuarioUpdateDialogComponent } from '../perfil-usuario-update-dialog/perfil-usuario-update-dialog.component';
import { PerfilUsuarioService } from './../../perfil-usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  titlePage = 'Perfil usuário';
  displayedColumns = ['id_perfil_usuario', 'ds_perfil_usuario', 'dt_inicio_vigencia', 'dt_fim_vigencia', 'actions'];
  perfilUsuario: PerfilUsuario[] = [];
  statusPerfilUsuarioActive = true;
  
  constructor(private perfilUsuarioService: PerfilUsuarioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.perfilUsuarioService.read().subscribe(perfilUsuario => {
      this.perfilUsuario = perfilUsuario;
      this.perfilUsuario.sort((a, b) => (a.id_perfil_usuario < b.id_perfil_usuario) ? -1 : 1)
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(PerfilUsuarioUpdateDialogComponent, {
      height: '450px',
      width: '500px',
    });
    dialogRef.componentInstance.id_perfil_usuario = String(id);
  }

  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(PerfilUsuarioDeleteDialogComponent, {
      height: '160px',
      width: '400px',
    });
    dialogRef.componentInstance.id_perfil_usuario = String(id);
  }

  openDialogCreate(): void {
    this.dialog.open(PerfilUsuarioCreateDialogComponent, {
      height: '260px',
      width: '500px',
    });
  }
  
}
