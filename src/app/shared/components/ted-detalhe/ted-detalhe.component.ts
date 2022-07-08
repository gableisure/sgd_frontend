import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AtividadeBacklogCreateDialogComponent } from 'src/app/modules/atividade-backlog/components/atividade-backlog-create-dialog/atividade-backlog-create-dialog.component';

@Component({
  selector: 'app-ted-detalhe',
  templateUrl: './ted-detalhe.component.html',
  styleUrls: ['./ted-detalhe.component.css']
})
export class TedDetalheComponent implements OnInit {
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openDialogCreate(): void {
    this.dialog.open(AtividadeBacklogCreateDialogComponent, {
      height: '800px',
      width: '900px',
    });
  }

  

}
