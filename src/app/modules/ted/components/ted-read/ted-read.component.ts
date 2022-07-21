import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TedCreateDialogComponent } from '../ted-create-dialog/ted-create-dialog.component';
import { TedUpdateDialogComponent } from '../ted-update-dialog/ted-update-dialog.component';
import { Ted } from '../../ted.module';
import { TedService } from './../../ted.service';
import { Usuario } from 'src/app/modules/usuario/usuario.module';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ted-read',
  templateUrl: './ted-read.component.html',
  styleUrls: ['./ted-read.component.css']
})
export class TedReadComponent implements OnInit {

  teds: Ted[] = [];
  tedsTheme = environment.teds.tedsTheme;
  usuario: Usuario[] = [];
  
  constructor(private tedService: TedService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.tedService.read().subscribe(teds => {
      this.teds = teds;
      this.teds.sort((a, b) => (a.sg_ted < b.sg_ted) ? -1 : 1);
    });
  }

  navigateToTedDetalhe(ted: Ted): void {
    this.router.navigate(['/ted-detalhe'], { queryParams: { idTed: ted.id_ted,  dsTed: ted.ds_ted} });
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
  
}
