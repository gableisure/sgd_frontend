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
  
  /* displayedColumns = ['nm_usuario', 'nr_cpf', 'dt_fim_vigencia', 'status', 'actions']; */
  displayedColumns = ['nm_usuario', 'nr_cpf', 'dt_inicio_vigencia', 'dt_fim_vigencia'];
  usuarios: Usuario[] = [];
  usuario: Usuario = {
    id_usuario: 0,
    nm_usuario: "",
    nr_cpf: "",
    id_perfil_usuario: 0,
    ds_perfil_usuario: "",
    id_ted: 0,
    dt_inicio_vigencia: "",
    dt_fim_vigencia: "",
    id_motivo_bloqueio: 0,
    status: true
  }

  checkedInactive = false;

  constructor(private usuarioService: UsuarioService, public dialog: MatDialog) { }

  /* ngOnInit(): void {
    this.usuarioService.read().subscribe(usuarios => {
      this.usuarios = usuarios
      this.usuarios.sort((a, b) => (a.nm_usuario.toUpperCase() < b.nm_usuario.toUpperCase()) ? -1 : 1)
    }); */

    ngOnInit(): void {
      this.usuarioService.read().subscribe(usuarios => {
        this.usuarios = usuarios;
        this.usuarios.forEach((usuarios) => {
          usuarios.status = usuarios.dt_fim_vigencia == undefined ? true : false;
          if (usuarios.dt_fim_vigencia != null) usuarios.dt_fim_vigencia = this.usuarioService.formatDateToISODate(usuarios.dt_fim_vigencia);
          usuarios.dt_inicio_vigencia = this.usuarioService.formatDateToISODate(usuarios.dt_inicio_vigencia);
        });
        this.usuarios = this.usuarios.filter((usuarios) => usuarios.status == true);
        this.usuarios.sort((a, b) => (a.nm_usuario > b.nm_usuario) ? -1 : 1);
         
      });
    }

    /* toggleStatus = (usuarioService: usuarioService) => this.updateprioridadeAtividade(prioridadeAtividade);

  toggleShowInactive() { 
    if(this.checkedInactive) {
      this.prioridadeAtividadeService.read().subscribe(prioridadeAtividade => this.prioridadeAtividade = prioridadeAtividade);
      this.prioridadeAtividadeService.read().subscribe((prioridadeAtividade) => {
        this.usuarios = prioridadeAtividade;
        this.usuarios.forEach((usuarios) => {
          prioridadeAtividade.status = prioridadeAtividade.dt_fim_vigencia == undefined ? true : false;
          if (prioridadeAtividade.dt_fim_vigencia != null) prioridadeAtividade.dt_fim_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_fim_vigencia);
          prioridadeAtividade.dt_inicio_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_inicio_vigencia);
        });
      });
    }else{
      this.prioridadeAtividadeService.read().subscribe((prioridadeAtividade) => {
        this.prioridadeAtividade = prioridadeAtividade;
        this.prioridadeAtividade.forEach((prioridadeAtividade) => {
          prioridadeAtividade.status = prioridadeAtividade.dt_fim_vigencia == undefined ? true : false;
          if (prioridadeAtividade.dt_fim_vigencia != null) prioridadeAtividade.dt_fim_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_fim_vigencia);
          prioridadeAtividade.dt_inicio_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_inicio_vigencia);
        });
        this.prioridadeAtividade = this.prioridadeAtividade.filter((prioridadeAtividade) => prioridadeAtividade.status == true);
        
      });
    }
   } */

    /* this.usuarioService.readById(this.id).subscribe((usuario) => {
      this.usuario = usuario;
    }); */
  }

  /* openDialogCreate(): void {
    this.dialog.open(UsuarioCreateDialogComponent, {
      height: '430px',
      width: '500px',
    });
  } */

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

