import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PerfilUsuario } from '../../perfil-usuario.module';
import { PerfilUsuarioCreateDialogComponent } from '../perfil-usuario-create-dialog/perfil-usuario-create-dialog.component';
import { PerfilUsuarioUpdateDialogComponent } from '../perfil-usuario-update-dialog/perfil-usuario-update-dialog.component';
import { PerfilUsuarioService } from './../../perfil-usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  titlePage = 'Perfil usuário';
  displayedColumns = ['id_perfil_usuario', 'ds_perfil_usuario', 'dt_inicio_vigencia', 'dt_fim_vigencia', 'status', 'actions'];
  perfilUsuario: PerfilUsuario[] = [];
  checkedInactive = false;
  
  constructor(private perfilUsuarioService: PerfilUsuarioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.perfilUsuarioService.read().subscribe(perfilUsuario => {
      this.perfilUsuario = perfilUsuario;
      this.perfilUsuario.forEach((perfilUsuario) => {
        perfilUsuario.status = perfilUsuario.dt_fim_vigencia == undefined ? true : false;
      });
      this.perfilUsuario = this.perfilUsuario.filter((motivoBloqueio) => motivoBloqueio.status == true);
      this.perfilUsuario.sort((a, b) => (a.id_perfil_usuario > b.id_perfil_usuario) ? -1 : 1);
       
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(PerfilUsuarioUpdateDialogComponent, {
      height: '260px',
      width: '500px',
    });
    dialogRef.componentInstance.id_perfil_usuario = String(id);
  }

  openDialogCreate(): void {
    this.dialog.open(PerfilUsuarioCreateDialogComponent, {
      height: '260px',
      width: '500px',
    });
  }

  toggleStatus = (perfilUsuario: PerfilUsuario) => this.updatePerfilUsuario(perfilUsuario);

  toggleShowInactive() { 
    if(this.checkedInactive) {
      this.perfilUsuarioService.read().subscribe(perfilUsuario => this.perfilUsuario = perfilUsuario);
      this.perfilUsuarioService.read().subscribe((perfilUsuario) => {
        this.perfilUsuario = perfilUsuario;
        this.perfilUsuario.forEach((perfilUsuario) => {
          perfilUsuario.status = perfilUsuario.dt_fim_vigencia == undefined ? true : false;
        });
      });
    }else{
      this.perfilUsuarioService.read().subscribe((perfilUsuario) => {
        this.perfilUsuario = perfilUsuario;
        this.perfilUsuario.forEach((perfilUsuario) => {
          perfilUsuario.status = perfilUsuario.dt_fim_vigencia == undefined ? true : false;
        });
        this.perfilUsuario = this.perfilUsuario.filter((perfilUsuario) => perfilUsuario.status == true);
        
      });
    }
   }

  private updatePerfilUsuario = (perfilUsuario: PerfilUsuario): void => {
    const dt_fim_vigencia = new Date;

    if(perfilUsuario.dt_fim_vigencia) {
      perfilUsuario.dt_fim_vigencia = null;
    }else{
      perfilUsuario.dt_fim_vigencia = this._formatDateToEn(dt_fim_vigencia.toISOString());
    }
    this.perfilUsuarioService.update(perfilUsuario).subscribe(() => {
      this.perfilUsuarioService.showMessage('Perfil do usuário atualizado com sucesso');
    });
  }

  _formatDateToEn(date: string): string {
    const date_format = new Date(Date.parse(date));

    var dd = String(date_format.getDate()).padStart(2, '0');
    var mm = String(date_format.getMonth() + 1).padStart(2, '0');
    var yyyy = date_format.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
  
}
