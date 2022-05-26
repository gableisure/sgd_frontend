import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TedCreateDialogComponent } from '../ted-create-dialog/ted-create-dialog.component';
import { TedUpdateDialogComponent } from '../ted-update-dialog/ted-update-dialog.component';
import { Ted } from '../../ted.module';
import { TedService } from './../../ted.service';
import { Usuario } from 'src/app/modules/usuario/usuario.module';
import { UsuarioService } from './../../../usuario/usuario.service';

@Component({
  selector: 'app-ted-read',
  templateUrl: './ted-read.component.html',
  styleUrls: ['./ted-read.component.css']
})
export class TedReadComponent implements OnInit {

  teds: Ted[] = [];
  colorsAvatar: string[] = ['#edffb3', '#bfe3c3', '#dbedc2', '#fff2d4', '#e9f3fc', '#a1c1be', '#f3f4e5', '#e2e3d9', '#bbdec6', '#dad8a7', '#f7f3cf', '#5ac7aa'];
  pesquisadoresTed: Usuario[] = [];
  usuarios: Usuario[] = []
  
  constructor(private tedService: TedService, private usuarioService: UsuarioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.tedService.read().subscribe(teds => {
      this.teds = teds;
    });

    
  }

  openDialogCreate(): void {
    this.dialog.open(TedCreateDialogComponent, {
      height: '250px',
      width: '500px',
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(TedUpdateDialogComponent, {
      height: '300px',
      width: '500px',
    });
    dialogRef.componentInstance.id_ted = String(id);
  }

  /* getUsersByIdTed(id_ted: number): number {
    this.usuarioService.getUsersByIdTed(String(id_ted)).subscribe(usuarios => {
      this.usuarios = usuarios;
    })
    return this.usuarios.length;
  } */
  
}
