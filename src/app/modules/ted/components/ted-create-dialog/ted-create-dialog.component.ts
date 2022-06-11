import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Ted } from '../../ted.module';
import { TedService } from './../../ted.service';

@Component({
  selector: 'app-ted-create-dialog',
  templateUrl: './ted-create-dialog.component.html',
  styleUrls: ['./ted-create-dialog.component.css']
})
export class TedCreateDialogComponent implements OnInit {

  titleDialog: string = 'Criar TED';
  ted: Ted = {
    id_ted: 0,
    ds_ted: '',
    sg_ted: '',
    dt_inicio_vigencia: '',
    dt_fim_vigencia: '',
    tb_usuario: [],
    status: true
  }

  constructor(private tedService: TedService, public dialogRef: MatDialogRef<TedCreateDialogComponent>) { }

  ngOnInit(): void {
    
  }

  createTed(): void {
    this.tedService.create(this.ted).subscribe(() => {
      this.dialogRef.close();
      this.tedService.showMessage('TED criada com sucesso!');
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
