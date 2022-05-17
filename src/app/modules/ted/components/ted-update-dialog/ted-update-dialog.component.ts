import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Ted } from '../../ted.module';
import { TedService } from './../../ted.service';

@Component({
  selector: 'app-ted-update-dialog',
  templateUrl: './ted-update-dialog.component.html',
  styleUrls: ['./ted-update-dialog.component.css']
})
export class TedUpdateDialogComponent implements OnInit {

  @Input() id_ted: string = '';

  titleDialog: string = 'Editar TED';

  ted: Ted = {
    ds_ted: ''
  } 
  
  constructor(private tedService: TedService, public dialogRef: MatDialogRef<TedUpdateDialogComponent>) { }

  ngOnInit(): void {
    this.tedService.readById(this.id_ted).subscribe((ted) => {
      this.ted = ted;
    });
  }

  updateTed(): void {
    this.tedService.update(this.ted).subscribe(() => {
      this.tedService.showMessage('TED atualizado com sucesso');
      this.dialogRef.close();
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
    window.location.reload();
  }

}
